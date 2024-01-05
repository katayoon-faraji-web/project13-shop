const words =['ResetTypeStudio', 'Welcome', 'Dobrodošli', 'Willkommen', 'Huānyíng', 'Bienvenidos', 'Eguahé Porá', 'Bienvenue', 'Üdvözlet', 'Benvinguts', 'Witajcie', 'Sveiki Atvykę','Benènnidu', 'Hoş Geldiniz', 'Vítejte','Laipni Lūdzam', 'Bem-vindo',' Bine Aţi Venit', 'Éékouabô']
let logo = document.getElementById('logo')
let header = document.getElementById('header')
let dropdownmenu = document.getElementById('dropdownmenu')
let list_btn = document.getElementById('list_btn')
let _as = document.querySelectorAll('#dropdownmenu a')
let firstletter = document.getElementById('firstletter')
let txt = document.getElementById('txt')
let cookie = document.getElementById('cookie')
let mn = document.getElementById('_main')
let whole = document.getElementById('whole') 
let all_sections = document.querySelectorAll('#whole>section')
let footer = document.getElementById('footer')
let close_card_btn = document.getElementById('close_card_btn')
let open_card_btn = document.getElementById('open_card_btn')
let wholeprice = document.getElementById('wholeprice')
let card = document.getElementById('card')
let buying_options = document.getElementById('buying_options')
let buying_options_ul = document.getElementById('buying_options_ul')
let add_to_card_btn = document.getElementById('add_to_card_btn')
let close_buying_options_btn = document.getElementById('close_buying_options_btn')
let family = document.getElementById('family')
let all_sell_box = document.getElementById('all_sell_box')
let sizes = document.querySelectorAll('.size')
let fill_sizes = document.querySelectorAll('.fill_size')

console.log(sizes);
const btns_for_fonts = document.querySelectorAll('.btn1')
const boxs = document.querySelectorAll('.box')
const lis_in_buying_options_ul = document.querySelectorAll('#buying_options_ul li')

let st_old = 0
let st = 0
let turn_btn = 1
let h = 0
let res = []
let card_array = []
let shoplist = []
let buyingoptions = []
let status = 'writing'
let i = 0
let t = 1
let _name =''
let turn_list = 1

// ***************api****************

async function getdata(){
    let response = await fetch("https://6595591004335332df8287f5.mockapi.io/fonts")
    res = await response.json()
}
getdata()

// ***************end api****************

setInterval(() => {
    logo.classList.toggle('br')
}, 500);

mn.addEventListener('scroll',(e)=>{
    st = Math.floor(e.target.scrollTop) 
    if(st_old>=st || st==0){
        header.style.top = 0
    }
    else if(st>st_old ){
        header.style.top = '-400px'
    }
    st_old = st
    cookie.style.transform = 'rotate('+st/20+'deg)'
})

open_card_btn.addEventListener('click',()=>{
    wholeprice.innerHTML = ''
    let phi = 0
    let  p = []
    card.style.right = '0'
    while(all_sell_box.firstChild) all_sell_box.removeChild(all_sell_box.lastChild);
    if(card_array.length==0){
        all_sell_box.innerHTML = 'your card is empty...'
    }
    else{
        all_sell_box.innerHTML = ''
        card_array.forEach((vall)=>{
            let _lii = document.createElement('li')
            _lii.innerHTML = `
                <div onclick="remove_li_from_card(event)" class="box2 mr-2 lg:mr-3 bg-black"></div>
                <span class="w-[30%] text-[12px] lg:text-[15px] text-black text-start mr-2 lg:mr-2">${vall.family}</span>
                <span class="w-[50%] text-[12px] lg:text-[15px] text-black text-start mr-2 lg:mr-2">${vall.type}</span>
                <span class="w-[5%] text-[12px] lg:text-[15px] text-black text-start">${vall.price}</span>
            `
            _lii.classList.add('li_in_buying_options_and_card')
            all_sell_box.appendChild(_lii)
            let pp = (vall.price).slice(0,(((vall.price).length)-1))
            p.push(pp)
        })
        p.forEach((item)=>{
            phi += Number(item) 
        })
        wholeprice.innerHTML = phi + '$'
    }
})

close_card_btn.addEventListener('click',()=>{
    card.style.right = '-1200px'
})

list_btn.addEventListener('click',(e)=>{
    if(turn_list % 2){
        dropdownmenu.style.transform = 'translateY(0px)'
    }else{
        dropdownmenu.style.transform = 'translateY(-800px)'
    }
    turn_list++
})

_as.forEach((val)=>{
    val.addEventListener('mouseenter',()=>{
        firstletter.innerHTML = val.innerHTML[0]
    })
})
_as
.forEach((val)=>{
    val.addEventListener('mouseout',()=>{
        firstletter.innerHTML = ''
    })
})

function _turn(){
    if(i<=((words.length)-1)){
        _name = words[i]
        if(i == ((words.length)-1)){
            i = 0
        }
        else{
            i++
        }
    }
}
_turn()

setInterval(() => {
    txt.classList.toggle('br')
        if(status=='writing'){
            if((t<=(_name.length))){
                txt.innerHTML = _name.slice(0,t)
                if(t == ((_name.length))){
                    status ='cleaning'
                }
                else{
                    t++
                }
            }
        }
        else{
            if(t>=0){
                txt.innerHTML = _name.slice(0,t)
                if(t==0){
                    status ='writing'
                    t = 1
                    _turn()
                }
                else{
                    t--
                }
            }
        }
    }, 150);

    btns_for_fonts.forEach((val)=>{
        val.addEventListener('click',(e)=>{
            e.stopImmediatePropagation()
            buyingoptions=[]
            buying_options.style.right = 0
            family.innerHTML = val.getAttribute("data-cont")
            while(buying_options_ul.firstChild) buying_options_ul.removeChild(buying_options_ul.lastChild);
            res.map((vall)=>{
                if(vall.family == val.getAttribute('data-cont')){
                    let _li = document.createElement('li')
                    
                    _li.innerHTML = `
                    <div  onclick="add_li_to_shoplist(event,${vall.id})" class="box"></div>
                    <span  class="type text-[12px] lg:text-[15px] text-black text-start mx-1 lg:mx-4 w-[70%]">${vall.type}</span>
                    <span class="price text-[12px] lg:text-[15px] text-black text-end w-[5%]">${vall.price}</span>
                    `
                    _li.setAttribute('data-state','off')
                    _li.classList.add('li_in_buying_options_and_card')
                    buyingoptions.push(_li)
                    buying_options_ul.appendChild(_li)
                }
            })
            
            card_array.forEach((vv)=>{
                if(vv.family==val.getAttribute("data-cont")){
                    buyingoptions.forEach((vvv)=>{
                        let childs = vvv.children
                        if(childs[1].innerHTML == vv.type){
                            childs[0].style.backgroundColor = 'black'
                            vvv.setAttribute('data-state','on')
                        }
                    })
                }
            })
        })
    })

    add_to_card_btn.addEventListener('click',(e)=>{
        card_array = []
        shoplist.forEach((val)=>{
            card_array.push(val)
        })
        buying_options.style.right = '-1200px'
        if(card_array.length==0){
            open_card_btn.innerHTML = `card(0)`
        }else{
            open_card_btn.innerHTML = `card(${card_array.length})`
        }
    })

    close_buying_options_btn.addEventListener('click',()=>{
        buying_options.style.right = '-1200px'
    })

    function add_li_to_shoplist(e,ind){
        console.log(ind);
        if(e.target.parentElement.getAttribute('data-state')=='off'){
            e.target.style.backgroundColor = 'black'
            e.target.parentElement.setAttribute('data-state' ,'on')
            shoplist.push(res[ind-1])
        }
        else{
            e.target.style.backgroundColor = 'white'
            e.target.parentElement.setAttribute('data-state' ,'off')
            shoplist.forEach((val,i)=>{
                if(res[ind-1].id == val.id){
                    shoplist.splice(i,i+1)
                }
            })
        }
        console.log(shoplist);
    }

    function remove_li_from_card(e){
        e.target.style.backgroundColor='white'
        card_array.forEach((val,i)=>{
            if((val.family == e.target.nextElementSibling.innerHTML) && (val.type== e.target.nextElementSibling.nextElementSibling.innerHTML)){
                card_array.splice(i,1)
                shoplist.splice(i,1)
            }
            if(card_array.length==0){
                open_card_btn.innerHTML = `card(0)`
            }else{
                open_card_btn.innerHTML = `card(${card_array.length})`
            }
        })
        open_card_btn.click()
    }

    window.addEventListener('click',()=>{
        card.style.right = '-1200px'
        buying_options.style.right = '-1200px'
    })

    card.addEventListener('click',(e)=>{
        e.stopImmediatePropagation()
    })

    buying_options.addEventListener('click',(e)=>{
        e.stopImmediatePropagation()
    })

    header.addEventListener('click',(e)=>{
        e.stopImmediatePropagation()
    })