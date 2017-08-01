

// Mixpanel init
(function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments, 0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" "); for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);

mixpanel.init("d88a3f958bee96f47745ae7b6f280df9");
        
window.onmessage = function(e){
    mixpanel.identify(e.data);
}
        
function handleToken(data) {
    console.log(data.data.session.access_token);
    window.top.location.href = "https://parent.zeal.com/#!/activation/name/?accessToken=" + data.data.session.access_token;
}
        
function signup() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var prof = {"user":{"name": email, "password": password}};
    console.log(JSON.stringify(prof));
    mixpanel.track("landing_signup");
    $.post("https://api.zeal.com/v7/public/users/parent", prof).done(handleToken);
}

window.setInterval(checkPassword,500);
    
var passMix = true;
var emailMix = true;

function checkPassword() {
    // 8 chars, 1 Let, 1 Num
    var curPass = document.getElementById("password").value;
            
    var length = false;
    var letter = false;
    var num = false;
    var email = false;
            
    var curEmail = document.getElementById("email").value;
            
    for (var i=0; i<curEmail.length; i++) {
        var char = curEmail.charAt(i);
        if (char === '@') email = true;
    }
            
    if (curPass.length >= 8) length = true;
            
    for (var i=0; i<curPass.length; i++) {
        var char = curPass.charAt(i);
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) letter = true;
        if (char >= '0' && char <= '9') num = true;
    }

    var button = document.getElementById("signup_button");
    if (length && letter && num) {
        if (passMix) {
            mixpanel.track("entered_password");
            passMix = false;
        }
        document.getElementById("password_help").style.visibility="hidden";
        if (email) {
            if (emailMix) {
                mixpanel.track("entered_email");
                emailMix = false;
            }
            button.style.pointerEvents="all";
            button.style.backgroundColor="rgb(19,178,197)";
        }
    } else {
        if(document.getElementById("password").value.length >= 1) 
            document.getElementById("password_help").style.visibility="visible";
                
        button.style.pointerEvents="none";
        button.style.backgroundColor="lightgrey";
    }
}
        
function showPassHelp() {
    document.getElementById("password_help").style.visibility="visible";
}

var click1 = 0;
function toggleAnswer1() {
    if (click1 % 2 === 0) {
        mixpanel.track("opened_question", {
            "Question title": "How does Zeal work?"
        })
        document.getElementById("answer1").style.visibility="visible";
        
        document.getElementById("answer2").style.visibility="hidden";
        document.getElementById("answer3").style.visibility="hidden";
        document.getElementById("answer4").style.visibility="hidden";
        document.getElementById("answer5").style.visibility="hidden";
        
        document.getElementById("question1").innerHTML="∨ How does Zeal work?";
        document.getElementById("answer1").style.top="40px";

        document.getElementById("question2").style.top="390px";
        document.getElementById("question3").style.top="390px";
        document.getElementById("question4").style.top="390px";
        document.getElementById("question5").style.top="390px";
        
        document.getElementById("question2").style.pointerEvents="none";
        document.getElementById("question3").style.pointerEvents="none";
        document.getElementById("question4").style.pointerEvents="none";
        document.getElementById("question5").style.pointerEvents="none";
    } else {
        document.getElementById("question1").innerHTML="> How does Zeal work?";
        document.getElementById("answer1").style.top="-260px";

        document.getElementById("question2").style.top="50px";
        document.getElementById("question3").style.top="50px";
        document.getElementById("question4").style.top="50px";
        document.getElementById("question5").style.top="50px";
        
        document.getElementById("question2").style.pointerEvents="all";
        document.getElementById("question3").style.pointerEvents="all";
        document.getElementById("question4").style.pointerEvents="all";
        document.getElementById("question5").style.pointerEvents="all";
    }
    click1++;
}

var click2 = 0;
function toggleAnswer2() {
    if (click2 % 2 === 0) {
        mixpanel.track("opened_question", {
            "Question title": "Who are Zeal tutors?"
        })
        document.getElementById("answer2").style.visibility="visible";
        
        document.getElementById("answer1").style.visibility="hidden";
        document.getElementById("answer3").style.visibility="hidden";
        document.getElementById("answer4").style.visibility="hidden";
        document.getElementById("answer5").style.visibility="hidden";
        
        document.getElementById("question2").innerHTML="∨ Who are Zeal tutors?";
        document.getElementById("answer2").style.top="-260px";

        document.getElementById("question3").style.top="145px";
        document.getElementById("question4").style.top="145px";
        document.getElementById("question5").style.top="145px";
        
        document.getElementById("question1").style.pointerEvents="none";
        document.getElementById("question3").style.pointerEvents="none";
        document.getElementById("question4").style.pointerEvents="none";
        document.getElementById("question5").style.pointerEvents="none";
    } else {
        document.getElementById("question2").innerHTML="> Who are Zeal tutors?";
        document.getElementById("answer2").style.top="-355px";

        document.getElementById("question3").style.top="50px";
        document.getElementById("question4").style.top="50px";
        document.getElementById("question5").style.top="50px";
        
        document.getElementById("question1").style.pointerEvents="all";
        document.getElementById("question3").style.pointerEvents="all";
        document.getElementById("question4").style.pointerEvents="all";
        document.getElementById("question5").style.pointerEvents="all";
    }
    click2++;
}

var click3 = 0;
function toggleAnswer3() {
    if (click3 % 2 === 0) {
        mixpanel.track("opened_question", {
            "Question title": "When are tutors available?"
        })
        document.getElementById("answer3").style.visibility="visible";
        
        document.getElementById("answer1").style.visibility="hidden";
        document.getElementById("answer2").style.visibility="hidden";
        document.getElementById("answer4").style.visibility="hidden";
        document.getElementById("answer5").style.visibility="hidden";
        
        document.getElementById("question3").innerHTML="∨ When are tutors available?";
        document.getElementById("answer3").style.top="-315px";

        document.getElementById("question4").style.top="125px";
        document.getElementById("question5").style.top="125px";
        
        document.getElementById("question1").style.pointerEvents="none";
        document.getElementById("question2").style.pointerEvents="none";
        document.getElementById("question4").style.pointerEvents="none";
        document.getElementById("question5").style.pointerEvents="none";
    } else {
        document.getElementById("question3").innerHTML="> When are tutors available?";
        document.getElementById("answer3").style.top="-380px";

        document.getElementById("question4").style.top="50px";
        document.getElementById("question5").style.top="50px";
        
        document.getElementById("question1").style.pointerEvents="all";
        document.getElementById("question2").style.pointerEvents="all";
        document.getElementById("question4").style.pointerEvents="all";
        document.getElementById("question5").style.pointerEvents="all";
    }
    click3++;
}

var click4 = 0;
function toggleAnswer4() {
    if (click4 % 2 === 0) {
        mixpanel.track("opened_question", {
            "Question title": "How much does Zeal cost?"
        })
        document.getElementById("answer4").style.visibility="visible";
        
        document.getElementById("answer1").style.visibility="hidden";
        document.getElementById("answer2").style.visibility="hidden";
        document.getElementById("answer3").style.visibility="hidden";
        document.getElementById("answer5").style.visibility="hidden";
        
        document.getElementById("question4").innerHTML="∨ How much does Zeal cost?";
        document.getElementById("answer4").style.top="-350px";

        document.getElementById("question5").style.top="140px";
        
        document.getElementById("question1").style.pointerEvents="none";
        document.getElementById("question2").style.pointerEvents="none";
        document.getElementById("question3").style.pointerEvents="none";
        document.getElementById("question5").style.pointerEvents="none";
    } else {
        document.getElementById("question4").innerHTML="> How much does Zeal cost?";
        document.getElementById("answer4").style.top="-420px";

        document.getElementById("question5").style.top="50px";
        
        document.getElementById("question1").style.pointerEvents="all";
        document.getElementById("question2").style.pointerEvents="all";
        document.getElementById("question3").style.pointerEvents="all";
        document.getElementById("question5").style.pointerEvents="all";
    }
    click4++;
}

var click5 = 0;
function toggleAnswer5() {
    if (click5 % 2 === 0) {
        mixpanel.track("opened_question", {
            "Question title": "How can I contact Zeal?"
        })
        document.getElementById("answer5").style.visibility="visible";
        
        document.getElementById("answer1").style.visibility="hidden";
        document.getElementById("answer2").style.visibility="hidden";
        document.getElementById("answer3").style.visibility="hidden";
        document.getElementById("answer4").style.visibility="hidden";
        
        document.getElementById("question5").innerHTML="∨ How can I contact Zeal?";
        document.getElementById("answer5").style.top="-400px";
        
        document.getElementById("question1").style.pointerEvents="none";
        document.getElementById("question2").style.pointerEvents="none";
        document.getElementById("question3").style.pointerEvents="none";
        document.getElementById("question4").style.pointerEvents="none";
    } else {
        document.getElementById("question5").innerHTML="> How can I contact Zeal?";
        document.getElementById("answer5").style.top="-470px";
        
        document.getElementById("question1").style.pointerEvents="all";
        document.getElementById("question2").style.pointerEvents="all";
        document.getElementById("question3").style.pointerEvents="all";
        document.getElementById("question4").style.pointerEvents="all";
    }
    click5++;
}