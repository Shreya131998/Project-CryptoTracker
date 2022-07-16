const form=document.querySelector("#searchForm")
const res=document.querySelector("#tableRes")
let upd;
form.addEventListener("submit",(e)=>{
    e.preventDefault()

    if(upd){
        clearTimeout(upd)
    }
    const ctype=form.elements.coinType.value
    //console.log(ctype)
    fetchPrice(ctype)
})

const fetchPrice=async(ctype)=>{
    let r=await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`)
    console.log(r)
    const price=r.data.coin.price
    const change=r.data.coin.priceChange1d
    const volume=r.data.coin.volume
    
    const base=r.data.coin.name
    

    res.innerHTML=`<tr style="background-color:lightslategray;color:white;font-weight:bold;">
        <td>Property</td>
        <td>Value</td>
    </tr>
    <tr>
        <td style="color:white;font-weight:bold;">${base}</td>
        <td style="color:white;">${price}</td>
    </tr>
    <tr>
    <td style="color:white;font-weight:bold;">Volume</td>
    <td style="color:white;">${volume}</td>
</tr>
<tr>
        <td style="color:white;font-weight:bold;">Change</td>
        <td style="color:white;">${change}</td>
    </tr>
    
    `
    upd=setTimeout(()=>fetchPrice(ctype),10000)

}