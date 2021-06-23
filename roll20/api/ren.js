
// 2021. 06. 23. / 2021. 06. 23.
// Roll20 attr 증가, 감소 api
// !ren 30 / !ren +30 / !ren -30 과 같이 사용하며, 숫자에만 대응.
// !ren +30-30과 같이 입력시 첫 항목만 인식하여 +30으로 적용.

on('chat:message', msg => {
    if(msg.type === 'api') {
        if (msg.content.indexOf("!ren ") === 0) {
            try {
                let character = findObjs({type:'character', name: msg.who})[0],
                    content = msg.content.replace("!ren ", ""),
                    num = parseInt(content);
                    
                if(character && num) {
                    // 사용할 attr 이름
                    attr = findObjs({type:'attribute', characterid: character.id, name: 'ren'})[0],
                    attrC = parseInt(attr.get('current')),
                    attrN = attrC + num;
                    
                    attr.set('current', attrN);
                    // 채팅창에 기록이 필요하다면 하단 주석(//)을 해제하고 사용
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
