-- 스키마 생성
DROP DATABASE IF EXISTS today_sky;
CREATE DATABASE today_sky;
-- today_sky 스키마 사용
USE today_sky;

-- USER 테이블 생성
CREATE TABLE USER (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- DIARY 테이블 생성
CREATE TABLE DIARY (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USER(id)
);

-- TODO 테이블 생성
CREATE TABLE TODO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    content VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES USER(id)
);

-- EMOTION 테이블 생성
CREATE TABLE EMOTION (
    id INT PRIMARY KEY,
    feel VARCHAR(255) NOT NULL
);

-- COMMENT 테이블 생성
CREATE TABLE COMMENT (
    id INT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    emotion_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (emotion_id) REFERENCES EMOTION(id),
    FOREIGN KEY (user_id) REFERENCES USER(id)
);

-- IMAGE 테이블 생성
CREATE TABLE IMAGE (
    path VARCHAR(255) NOT NULL,
    comment_id INT NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES COMMENT(id)
);
