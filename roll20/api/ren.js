
// 최초 업로드 2021. 06. 23. / 최종 수정 2021. 06. 23.
// https://github.com/seeoya/lalllaby
// Roll20 attr 증가, 감소 api

// ex. !ren 10 (+10), !ren -10 (-10), !ren d10(+1d10), !ren -d30(-1d30)

on('chat:message', msg => {
    if(msg.type === 'api') {
        
        // 사용할 attr 이름 입력. 예시는 ren.
        let attrName = 'ren';
        
        if (msg.content.indexOf("!ren ") === 0) {
            try {
                let character = findObjs({type:'character', name: msg.who})[0],
                    cont = msg.content.replace("!ren ", ""),
                    dFlag = cont.indexOf("d"),
                    num = 0;
                    
                    if(character) {
                        if(dFlag > -1) {
                            cont = cont.replace("d", "");
                            num = Math.floor((Math.random() * (parseInt(cont) - 1)) + 1);
                        } else {
                            num = parseInt(cont);
                        }
                    
                        if(num) {
                            attr = findObjs({type:'attribute', characterid: character.id, name: attrName})[0],
                            attrC = parseInt(attr.get('current')),
                            attrN = attrC + num;
                            attr.set('current', attrN);
                        }
                        
                        // 채팅창 기록이 필요하다면 하단 주석(//)을 해제하고 사용.
                        // sendChat(msg.who, attrC + " + " + num + " → " + attrN);
                    } else {
                        sendChat("error", "/w " + msg.who + "형식오류. 다시 시도해주세요!")
                    }
            } catch(err) {
                sendChat('error', '/w gm ' + err);
            }
        }
    }
});

// end
