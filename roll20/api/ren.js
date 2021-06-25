// 최초 업로드 2021. 06. 23. / 최종 수정 2021. 06. 23.
// https://github.com/seeoya/lalllaby
// Roll20 attr 증가, 감소 api

// ex. !ren 10 (+10), !ren -10 (-10), !ren d10(+1d10), !ren -4d30(-4d30)

on("chat:message", msg => {
    if (msg.type === "api") {
        // 사용할 attr 이름 입력. 예시는 ren.
        let attrName = "ren";

        if (msg.content.indexOf("!ren ") === 0) {
            try {
                let character = findObjs({ type: "character", name: msg.who })[0],
                    cont = msg.content.replace("!ren ", ""),
                    mFlag = false, dFlag = cont.indexOf("d"), aFlag = cont.indexOf("a"),
                    sig = " + ", attrText = "",
                    cont1 = 0, cont2 = 0, rand = 0, num = 0;
                    cont = cont.replace("a ", "");
                
                    if(cont.indexOf("-") > -1) {
                        mFlag = true;
                        sig = " - ";
                        cont = cont.replace("-", "");
                    } else {
                        cont = cont.replace("+", "");
                    }

                if (character) {
                    if (dFlag > -1) {
                        if(!cont.split("d")[0]) {
                            cont1 = 1;
                            cont2 = parseInt(cont.split("d")[1]);
                        } else {
                            cont1 = parseInt(cont.split("d")[0]);
                            cont2 = parseInt(cont.split("d")[1]);
                        }

                        for (let idx = 0; idx < cont1; idx++) {
                            rand = Math.floor(Math.random() * (cont2 - 1) + 1);
                            num += rand;
                            attrText += rand;
                            if (idx != cont1 - 1) { attrText += ", "; }
                        };

                        attrText = " ( " + cont.toUpperCase() + " : " + attrText + " )";
                        num = parseInt(num);
                    } else {
                        num = parseInt(cont);
                    }
                    
                    attr = findObjs({ type: "attribute", characterid: character.id, name: attrName })[0];
                    attrC = parseInt(attr.get("current"));
                    if(mFlag) {attrN = attrC - num;}
                    else {attrN = attrC + num;}
                    
                    if(!attrN) {
                        sendChat("error", "/w " + msg.who + "형식오류. attr을 확인해주세요!");
                        return false;
                    }

                    attr.set("current", attrN);

                    // 채팅창 기록이 필요하다면 하단 주석(//)을 해제하고 사용.
                    // 채팅창에 올리기
                    // sendChat(msg.who, attrC + sig + num + attrText + " → " + attrN);
                    // GM에게 귓하기
                    // sendChat(msg.who, "/w gm " + attrC + sig + num + attrText + " → " + attrN);
                    // 나에게 귓하기
                    // sendChat(msg.who, "/w " + msg.who + " " + attrC + sig + num + attrText + " → " + attrN);
                    
                    if(aFlag > -1) {
                        sendChat(msg.who, "/em +" + num);
                    }
                } else {
                    sendChat("error", "/w " + msg.who + "형식오류. 저널을 확인해주세요!");
                }
            } catch (err) {
                sendChat("error", "/w gm " + err);
            }
        }
    }
});

// end
