
/*
2020. 05. 19.
https://github.com/seeoya/lalllaby
구글 스프레드 시트 행 크기 설정하는 스크립트 백업
*/

function myRowHeightSet() {
  
  /* 행 크기 설정할 시트의 순서 입력
     좌측 시트부터 1, 2, 3 카운트 */
  var sheetNumber = 2;
  
  /* 행 크기 설정할 범위 지정 (startNum=시작행, endNum=종료행)
     스프레드 시트 기준 좌측 행 넘버 입력 */
  var startNum = 247;
  var endNum = 282;
  
  /* 행 크기 설정의 기준이 되는 열의 넘버 (1, 2, 3...) */
  var countColumn = 8;
  
  /* 기본 행 크기(1줄) */
  var height1 = 30;
  /* 엔터당 추가될 행 크기(2줄~) */
  var height2 = 15;
  
  /////////////////////////////////////////
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[sheetNumber-1];
  
  for(i = startNum; i <= endNum; i++) {
    var any = (sheet.getRange(i, countColumn).getValue().toString().split("\n").length)-1;
    sheet.setRowHeight(i, height1+(any*height2));
  }
}
 
