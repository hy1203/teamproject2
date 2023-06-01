-- 스키마 생성
CREATE DATABASE today_sky;

-- today_sky 스키마 사용
USE today_sky;

-- USER 테이블 생성
CREATE TABLE USER (
    id INT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

-- DIARY 테이블 생성
CREATE TABLE DIARY (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    date DATE
);

-- TODO 테이블 생성
CREATE TABLE TODO (
    id INT PRIMARY KEY,
    content VARCHAR(255)
);

-- COMMENT 테이블 생성
CREATE TABLE COMMENT (
    id INT PRIMARY KEY,
    content VARCHAR(255),
    emotion VARCHAR(255),
    image_id INT,
    FOREIGN KEY (image_id) REFERENCES IMAGE(id)
);

-- EMOTION 테이블 생성
CREATE TABLE EMOTION (
    feel VARCHAR(255)
);

-- IMAGE 테이블 생성
CREATE TABLE IMAGE (
    path VARCHAR(255)
);

-- 외래 키 설정
ALTER TABLE IMAGE ADD FOREIGN KEY (comment_id) REFERENCES COMMENT(id);
