// Content script that runs on all web pages
(function() {
    'use strict';

    const currentUrl = window.location.hostname;
    let hiddenElements = new Set();

    // Apply hidden elements when page loads
    function applyHiddenElements() {
        chrome.storage.local.get([currentUrl], function(result) {
            const selectors = result[currentUrl] || [];
            selectors.forEach(function(selector) {
                hideElement(selector);
            });
        });
    }

    // Hide element by selector
    function hideElement(selector) {
        try {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                elements.forEach(function(element) {
                    element.style.setProperty('display', 'none', 'important');
                    element.setAttribute('data-div-hider-hidden', 'true');
                    hiddenElements.add(selector);
                });
                return true;
            }
            return false;
        } catch (e) {
            console.error('Invalid selector:', selector);
            return false;
        }
    }

    // Show element by selector
    function showElement(selector) {
        try {
            const elements = document.querySelectorAll(selector + '[data-div-hider-hidden="true"]');
            elements.forEach(function(element) {
                element.style.removeProperty('display');
                element.removeAttribute('data-div-hider-hidden');
            });
            hiddenElements.delete(selector);
        } catch (e) {
            console.error('Invalid selector:', selector);
        }
    }

    // Show all hidden elements
    function showAllElements() {
        const allHidden = document.querySelectorAll('[data-div-hider-hidden="true"]');
        allHidden.forEach(function(element) {
            element.style.removeProperty('display');
            element.removeAttribute('data-div-hider-hidden');
        });
        hiddenElements.clear();
    }

    // Save hidden selector to storage
    function saveHiddenSelector(selector) {
        chrome.storage.local.get([currentUrl], function(result) {
            let hiddenSelectors = result[currentUrl] || [];
            if (!hiddenSelectors.includes(selector)) {
                hiddenSelectors.push(selector);
                chrome.storage.local.set({[currentUrl]: hiddenSelectors});
            }
        });
    }

    // Remove hidden selector from storage
    function removeHiddenSelector(selector) {
        chrome.storage.local.get([currentUrl], function(result) {
            let hiddenSelectors = result[currentUrl] || [];
            hiddenSelectors = hiddenSelectors.filter(s => s !== selector);
            
            if (hiddenSelectors.length === 0) {
                chrome.storage.local.remove([currentUrl]);
            } else {
                chrome.storage.local.set({[currentUrl]: hiddenSelectors});
            }
        });
    }

    // Listen for messages from popup
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.url !== currentUrl) {
            sendResponse({success: false, message: 'URL mismatch'});
            return;
        }

        switch (request.action) {
            case 'hideElement':
                const success = hideElement(request.selector);
                if (success) {
                    saveHiddenSelector(request.selector);
                }
                sendResponse({success: success});
                break;

            case 'showElement':
                showElement(request.selector);
                removeHiddenSelector(request.selector);
                sendResponse({success: true});
                break;

            case 'showAllElements':
                showAllElements();
                sendResponse({success: true});
                break;

            default:
                sendResponse({success: false, message: 'Unknown action'});
        }
    });

    // Apply hidden elements when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyHiddenElements);
    } else {
        applyHiddenElements();
    }

    // Re-apply hidden elements when new content is added (for dynamic websites)
    const observer = new MutationObserver(function(mutations) {
        let shouldReapply = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldReapply = true;
            }
        });
        
        if (shouldReapply && hiddenElements.size > 0) {
            setTimeout(function() {
                hiddenElements.forEach(function(selector) {
                    hideElement(selector);
                });
            }, 100);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();