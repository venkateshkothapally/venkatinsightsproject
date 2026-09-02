    // Function to toggle the mobile navigation drawer when the hamburger icon is clicked
    function toggleMobileMenu() {
        const navWrapper = document.getElementById('navPillsContainer');
        if (navWrapper) {
            navWrapper.classList.toggle('mobile-open');
        }
    }

    // Dynamic Search Clear Button Handling
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput && clearSearchBtn) {
        searchInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                clearSearchBtn.style.display = 'block';
            } else {
                clearSearchBtn.style.display = 'none';
            }
        });
    }

    function clearSearch() {
        if (searchInput && clearSearchBtn) {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            searchInput.focus();
            if (typeof filterServices === 'function') {
                filterServices();
            }
        }
    }
