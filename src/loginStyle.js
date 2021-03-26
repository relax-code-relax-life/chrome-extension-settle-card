const form = document.querySelectorAll('form[action=LoginSecService]')[0];
if (form) {
    const table = form.parentElement;
    const trs = table.getElementsByTagName('tr');
    for (let tr of trs) {
        if (tr.style.display !== 'none') {
            tr.style.display = 'block';
        }
    }
}
