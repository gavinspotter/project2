// code referenced from https://codepen.io/clagosv/pen/YjQdao
document.getElementById('btnPrint').onclick = () => {
    printElement(document.getElementById('printThis'));
}

function printElement(elem) {
    // call a duplicate of 'printThis'
    var domClone = elem.cloneNode(true);
    // get element 'printSection;
    var $printSection = document.getElementById('printSection');
    // If it doesn't exist, create it
    if (!$printSection) {
        var $printSection = document.createElement('div');
        $printSection.id = 'printSection';
        document.body.appendChild($printSection);
    }
    
    $printSection.innerHTML = '';
    $printSection.appendChild(domClone);
    window.print();
}