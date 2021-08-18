function updateText(){
    setText("#val_systime",dat.sys.STIME);
    setText("#val_msname",dat.sys.SMOBONAME);
    setText("#val_sysmem",dat.sys.SFREEMEM);
    setText("#val_gpu",dat.sys.SGPU1UTI);

    setText("#val_u1",dat.sys.SCPU1UTI);
    setText("#val_u2",dat.sys.SCPU2UTI);
    setText("#val_u3",dat.sys.SCPU3UTI);
    setText("#val_u4",dat.sys.SCPU4UTI);
    setText("#val_u5",dat.sys.SCPU5UTI);
    setText("#val_u6",dat.sys.SCPU6UTI);
    setText("#val_u7",dat.sys.SCPU7UTI);
    setText("#val_u8",dat.sys.SCPU8UTI);

    setText("#val_d12",dat.sys.SDSK1WRITESPD);
    setText("#val_d11",dat.sys.SDSK1READSPD);
    setText("#val_d22",dat.sys.SDSK2WRITESPD);
    setText("#val_d21",dat.sys.SDSK2READSPD);
    
    setText("#val_d32",dat.sys.SDSK3WRITESPD);
    setText("#val_d31",dat.sys.SDSK3READSPD);
    setText("#val_d42",dat.sys.SDSK4WRITESPD);
    setText("#val_d41",dat.sys.SDSK4READSPD);

    setText("#val_ndl",dat.sys.SNIC5DLRATE);
    setText("#val_nup",dat.sys.SNIC5ULRATE);
    setText("#val_nip","🏠:"+dat.sys.SPRIIPADDR.value+"\r\n🌎:"+dat.sys.SEXTIPADDR.value);

    setText("#val_battery",dat.sys.SBATTLVL);
    setText("#val_batteryType",dat.sys.SPWRSTATE);

    setText("#val_vlm",dat.sys.SMASTVOL);
    setText("#val_brt",dat.sys.SDISPBRILVL);
    setText("#val_fps",dat.sys.SRTSSFPS);

}
function updateAttribute(){

}
function updateProgress(){
    setProgress("#prog_sysmem",dat.sys.SFREEMEM,dat.sys.SUSEDMEM,true)
    setProgress("#prog_gpu",dat.sys.SGPU1UTI,100)
    setProgress("#prog_u1",dat.sys.SCPU1UTI,100)
    setProgress("#prog_u2",dat.sys.SCPU2UTI,100)
    setProgress("#prog_u3",dat.sys.SCPU3UTI,100)
    setProgress("#prog_u4",dat.sys.SCPU4UTI,100)
    setProgress("#prog_u5",dat.sys.SCPU5UTI,100)
    setProgress("#prog_u6",dat.sys.SCPU6UTI,100)
    setProgress("#prog_u7",dat.sys.SCPU7UTI,100)
    setProgress("#prog_u8",dat.sys.SCPU8UTI,100)
    setProgress("#prog_battery",dat.sys.SBATTLVL,100)
    setProgress("#prog_vlm",dat.sys.SMASTVOL,100)
    setProgress("#prog_brt",dat.sys.SDISPBRILVL,100)
    setProgress("#prog_fps",dat.sys.SRTSSFPS,dat.sys.SVREFRATE)
}



function setText(selector,val){
    $(selector).text(_a(val));
}
function setProgress(selector,now,max,plus){
    $(selector).css("height",_n(_a(now))/(_n(_a(max))+(plus?_n(_a(now)):0))*100+"%")
}
function setAttr(selector,attr,val){
    $(selector).attr(attr,val);
}
var ws=new WebSocket("ws://192.168.1.9:9922"),dat;
ws.onopen=()=>setInterval(()=>ws.send("get"),1000);
ws.onmessage=(e)=>{
    dat=JSON.parse(e.data);
    updateText();
    updateAttribute();
    updateProgress();
}
function _a(v){
    if(typeof v == "object"){
        if(v.value)return v.value;
        else return JSON.stringify(v);
    }else if(typeof v =="number")return "" + v;
    else if(typeof v =="string")return v;
    else return "--";
}
function _n(v){return parseFloat(v);}
function _f(v){return v.toFixed(2);}