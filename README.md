# 구축 개요
1. 토렌트 다운로드 프로세스의 비효율성 발생
  1. 미디어 업로드 요청
  2. 미디어 토렌트 검색
  3. 토렌트 마그넷 복사 / 토렌트 파일 다운로드
  4. Transmission Upload

# Tech Spec
* Telegram Bot Api
* NodeJS Web Server
* NodeJS Web Crawler
* Mobile - Telegram App

# Scrap
* Telegram Api - NodeJS
* [텔레그랫 봇 만들기](https://translate.google.co.kr/translate?sl=en&tl=ko&js=y&prev=_t&hl=ko&ie=UTF-8&u=https%3A%2F%2Fcore.telegram.org%2Fbots%2Fapi&edit-text=&act=url)

## 작업내역
* Telegram 봇 생성
* Telegram 봇 실행
* NodeJS 설치 및 실행
* 개발환경 설정
  * Atom - Remote-FTP 연결
* Node-Telegram 봇 NPM 설치
* Telegram Bot -> Node 서버로 요청
  * Node 서버설정
  * [Telegram Bot API](https://github.com/yagop/node-telegram-bot-api) 사용
    * Request
      * Telegram Bot -> Node Server로 요청
    * Response
      * Node Server -> Telegram Bot 으로 응답
* 토렌트 크롤러 제작
  * Scraping.js
    * 티프리카 크롤링 -> 토렌트 킴 크롤링으로 변경
      * URL 형식: http://www.tfreeca22.com/torrent_info.php?bo_table=tdrama&wr_id=690279
---
        * ID 가 반드시 필요함
      * input : 검색어 메세지
      * output : 게시물 ID
  * Magnet parser
    * input : 게시물 ID
    * output : 마그넷 주소
  * Transmission Application
    * input : 마그넷 주소
    * output : 토렌트 다운로드 시작 명령어 구동
* Telegram Bot - Crawler 연동
  * Request
    * Telegram Bot -> Node Server로 요청
    * 검색어 크롤링
    * 리스트 리턴
    * 텔레그램 이벤트 콜백
    * 해당 내용에 대한 토렌트 파일 검색 및 다운로드
    * transmission-remote -a  magnet:?xt=urn:btih:7C82433685A1C8B65649836818C9783881FE6A47
    * sh
  * Response
    * Node Server -> Telegram Bot 으로 응답
    * 다운로드가 시작되었습니다
    * 다운로드가 완료되었습니다
    * [참고자료](https://redreamer.wordpress.com/2016/01/03/telebot을-이용한-원격-토렌트-다운로드-시스템/)

* 2차
  * 다운로드 후 스탑기능 추가
  * 다운로드 컨펌창 추가
  * 현재 다운로드 현황
  * 용량 밸리데이션
  *


## 참고자료 정리
[노드에서 유닉스 명령어 실행하기](https://blog.outsider.ne.kr/551)
[자바스크립트 replace / replaceall](http://ooz.co.kr/65)
[텔레그램 봇 인라인 키보드 샘플소스](http://jsbin.com/noqepukizo/edit?js,console)
[텔레그램 봇 키보드 콜백 샘플소스](http://stackoverflow.com/questions/38115263/telegram-bot-api-inlinekeyboard-not-worked)
[텔레그램 봇 + 노드 기본개념잡기](https://developer.ibm.com/kr/developer-기술-포럼/2017/03/11/node-js-어플리케이션-텔레그램과-연동하기/)
[텔레그램 봇 토렌트 연동 - 파이썬](https://redreamer.wordpress.com/2016/01/03/telebot을-이용한-원격-토렌트-다운로드-시스템/)
[텔레그램 봇 토렌트 연동 - 개념잡기](http://clien.net/cs2/bbs/board.php?bo_table=lecture&wr_id=303706)
[노드JS 기본개념잡기 - 웹어플리케이션](http://www.nextree.co.kr/p8574/)
[노드JS 크롤링](https://dobest.io/nodejs-web-crawling-with-cheerio/)
