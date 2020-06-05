/*
  2020. 06. 05.
  https://github.com/seeoya/lalllaby
  구글 스프레드 시트 해당 범위 정렬 + 행 크기 설정하는 스크립트 백업
*/

function mySet() {
  
  /* 행 크기 설정할 시트의 순서 입력
     좌측 시트부터 1, 2, 3 카운트 */
  var sheetNumber = 2;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[sheetNumber-1];
  
  /* 행 크기 설정할 범위 지정 (startNum=시작행, endNum=종료행)
     스프레드 시트 기준 좌측 행 넘버 입력 */
  var startNum = 230;
  var endNum = 237;
  
  /* 행 크기 설정 기준이 되는 열의 넘버 (A부터 1, 2, 3...) */
  var countColumn = 8;
  
  /* 기본 행 크기(1줄) */
  var height1 = 30;
  /* 엔터당 추가될 행 크기(2줄~) */
  var height2 = 15;
  
  /* 정렬에 필요한 범위 */
  var rangeString = "B" + startNum + ":K" + endNum; 
  
  /* 정렬 기준 열의 넘버 (A부터 1, 2, 3...) */
  var sortByColumn = 4;
  
  /////////////////////////////////////////
  
  /* 해당 열 기준 정렬 */
  var range = sheet.getRange(rangeString);
  range.sort({column:sortByColumn});
  
  /* 행 크기 설정 */
  for(i = startNum; i <= endNum; i++) {
    var any = (sheet.getRange(i, countColumn).getValue().toString().split("\n").length)-1;
    sheet.setRowHeight(i, height1+(any*height2));
  }
}
