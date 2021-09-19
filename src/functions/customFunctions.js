export function alternateUnderline(urlpath){
    // shows underline on active page only
    switch(urlpath){
        case '/':
            const home = document.querySelector('.home');
            home ? home.style.textDecoration = 'underline' : <></>
            break;
        case '/clothing':
            document.querySelector('.clothing').style.textDecoration = 'underline';
            document.getElementById('brands_menu').firstElementChild.nextElementSibling.style.textDecoration = 'underline';
            break;
        case '/shoes':
            document.querySelector('.shoes').style.textDecoration = 'underline';
            document.getElementById('brands_menu').lastElementChild.previousElementSibling.style.textDecoration = 'underline';
            break;
        case '/accessories':
            document.querySelector('.accessories').style.textDecoration = 'underline';
            document.getElementById('brands_menu').lastElementChild.style.textDecoration = 'underline';
            break;
        case '/submit-product':
            const submitProduct = document.querySelector('.submit-product');
            submitProduct ? submitProduct.style.textDecoration = 'underline' : <></>
            break;
        default:
    }
}   
