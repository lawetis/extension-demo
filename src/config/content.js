console.info('加载成功!')

const iconURL = chrome.runtime.getURL('/images/logo/logo48.png')

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            insertIcon(mutation.addedNodes)
        }
    })
})

observer.observe(document.body, { childList: true, subtree: true })

function insertIcon(addedNodes) {
    addedNodes.forEach((node) => {
        const profileImageContainers = node.querySelectorAll('.css-175oi2r.r-18kxxzh.r-1b7u577.r-onrtq4.r-1awozwy')

        profileImageContainers.forEach((container) => {
            if (!container.querySelector('.extension_test_demo_insert_img')) {
                const icon = document.createElement('img')
                icon.src = iconURL
                icon.className = 'extension_test_demo_insert_img'
                icon.style.cssText = 'width: 36px; height: 36px;margin-top: 20px;border-radius: 50%;'
                container.appendChild(icon)
            }
        })
    })
}
