document.addEventListener('DOMContentLoaded', function() {
    const selectorInput = document.getElementById('selector');
    const hideBtn = document.getElementById('hideBtn');
    const showAllBtn = document.getElementById('showAllBtn');
    const clearBtn = document.getElementById('clearBtn');
    const hiddenList = document.getElementById('hiddenList');
    const hiddenItems = document.getElementById('hiddenItems');
    const currentUrlDiv = document.getElementById('currentUrl');

    let currentUrl = '';

    // Get current tab URL
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        currentUrl = new URL(tabs[0].url).hostname;
        currentUrlDiv.textContent = `Current site: ${currentUrl}`;
        loadHiddenElements();
    });

    // Hide div button
    hideBtn.addEventListener('click', function() {
        const selector = selectorInput.value.trim();
        if (!selector) {
            alert('Please enter a class name or ID');
            return;
        }

        // Validate selector format
        if (!selector.startsWith('.') && !selector.startsWith('#')) {
            alert('Please use proper format: .className or #idName');
            return;
        }

        // Send message to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'hideElement',
                selector: selector,
                url: currentUrl
            }, function(response) {
                if (response && response.success) {
                    selectorInput.value = '';
                    loadHiddenElements();
                } else {
                    alert('Element not found or already hidden');
                }
            });
        });
    });

    // Show all button
    showAllBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'showAllElements',
                url: currentUrl
            }, function(response) {
                loadHiddenElements();
            });
        });
    });

    // Clear list button
    clearBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all hidden elements for this site?')) {
            chrome.storage.local.remove([currentUrl], function() {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'showAllElements',
                        url: currentUrl
                    });
                });
                loadHiddenElements();
            });
        }
    });

    // Load and display hidden elements
    function loadHiddenElements() {
        chrome.storage.local.get([currentUrl], function(result) {
            const hiddenSelectors = result[currentUrl] || [];
            
            if (hiddenSelectors.length === 0) {
                hiddenList.style.display = 'none';
                return;
            }

            hiddenList.style.display = 'block';
            hiddenItems.innerHTML = '';

            hiddenSelectors.forEach(function(selector, index) {
                const item = document.createElement('div');
                item.className = 'hidden-item';
                
                const selectorSpan = document.createElement('span');
                selectorSpan.textContent = selector;
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', function() {
                    removeHiddenElement(selector, index);
                });
                
                item.appendChild(selectorSpan);
                item.appendChild(removeBtn);
                hiddenItems.appendChild(item);
            });
        });
    }

    // Remove specific hidden element
    function removeHiddenElement(selector, index) {
        chrome.storage.local.get([currentUrl], function(result) {
            let hiddenSelectors = result[currentUrl] || [];
            hiddenSelectors.splice(index, 1);
            
            if (hiddenSelectors.length === 0) {
                chrome.storage.local.remove([currentUrl]);
            } else {
                chrome.storage.local.set({[currentUrl]: hiddenSelectors});
            }
            
            // Show the element again
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'showElement',
                    selector: selector,
                    url: currentUrl
                });
            });
            
            loadHiddenElements();
        });
    }

    // Allow Enter key to hide element
    selectorInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            hideBtn.click();
        }
    });
});