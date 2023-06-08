"use strict";

/**
 * @typedef {object} Diary
 * @property {string} content
 * @property {string} emotion
 * @property {string?} image
 */

async function fillDiary() {
  // api 에서 데이터를 받아온다.
  /** @type {Diary} */
  const diary = await getDiary();
  // 데이터를 화면에 렌더링 한다.
  renderDiary(diary);
}

// api 에서 데이터를 받아오는 함수
async function getDiary() {
  // api 주소를 변수에 저장한다.
  const api = getApi();
  // api 에서 데이터를 받아온다.
  const response = await fetch(api);
  // 받아온 데이터를 json 형태로 변환한다.
  return await response.json();
}

// api 주소를 반환하는 함수
function getApi() {
  const apiHost = "/api"; // 추후 api 호스트 분리시 변경
  // 현재 페이지 path에 api 호스트만 만 붙이면 된다.
  const path = window.location.pathname;
  const apiUrl = `${apiHost}${path}`;
  return apiUrl;
}

/**
 * @param {Diary} diary
 */
function renderDiary(diary) {
  // 날짜를 렌더링 한다.
  renderDate();
  // 일기를 렌더링 한다.
  renderContent(diary.content);
  // 감정을 렌더링 한다.
  renderEmotion(diary.emotion);
  // 만약 이미지가 있다면 이미지를 렌더링 한다.
  if (diary.image) {
    renderImage(diary.image);
  }
}

function renderDate() {
  // 주소에서 날짜를 가져온다.
  const [year, month, day] = window.location.pathname.split("/").slice(-3);
  // span#yea 에 연도를 렌더링 한다.
  document.getElementById("year").innerText = year;
  // span#month 에 월을 렌더링 한다.
  document.getElementById("month").innerText = month;
  // span#day 에 일을 렌더링 한다.
  document.getElementById("day").innerText = day;
}

/** @param {string} conntent */
function renderContent(conntent) {
  // p.content 에 일기를 렌더링 한다.
  document.getElementById("content").innerText = conntent;
}

/** @param {string} emotion */
function renderEmotion(emotion) {
  // span#emotion 에 감정을 렌더링 한다.
  document.getElementById("emotion").innerText = emotion || "😀";
}

/** @param {string} image */
function renderImage(image) {
  // img#image 에 이미지를 렌더링 한다.
  document.getElementById("image").src = image;
}
