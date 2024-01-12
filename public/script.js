const trust = document.querySelector('#trustBox')
trust.addEventListener('click', disableAll)
let formControls = document.querySelectorAll('.fc')
function disableAll(){
    for(let control of formControls){
        control.toggleAttribute('disabled')
    }
}