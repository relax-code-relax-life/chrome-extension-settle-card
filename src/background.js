chrome.contextMenus.create({
    contexts: ['page_action', 'action'],
    title: '打开「北京市工作居住证系统」',
    id: 'popup_menu01'
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'popup_menu01') {
        chrome.tabs.create({
            url: 'http://219.232.200.39/uamsso/'
        });
    }
})