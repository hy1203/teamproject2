# 그날의 하늘

- [그날의 하늘](#그날의-하늘)
  - [Page](#page)
  - [API](#api)
  - [DB](#db)

## Page

| Path                           | Description                             |
| ------------------------------ | --------------------------------------- |
| /                              | 메인 페이지                             |
| /login                         | 로그인 페이지                           |
| /signup                        | 회원가입 페이지                         |
| /sky                           | /sky/`year`/`month` 리다이렉트          |
| /sky/`year`/`month`            | `year`년 `month`월 일기 페이지          |
| /sky/`year`/`month`/`day`      | `year`년 `month`월 `day`일 일기 페이지  |
| /sky/`year`/`month`/`day`/star | `year`년 `month`월 `day`일 할 일 페이지 |

## API

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Method</th>
      <th>Params</th>
      <th>Data</th>
      <th>CRUD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/api/sky/`year`/`month`</td>
      <td>GET</td>
      <td>`year`, `month`</td>
      <td>`year`년 `month` 월 일기</td>
      <td>READS</td>
    </tr>
    <tr>
      <td rowspan="4">/api/sky/`year`/`month`/`day`/cloud</td>
      <td>GET</td>
      <td rowspan="6">`year`, `month`, `day`</td>
      <td rowspan="4">`year`년 `month` 월 `day` 일 일기</td>
      <td>READ</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>CREATE</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>DELETE</td>
    </tr>
    <tr>
      <td rowspan="2">/api/sky/`year`/`month`/`day`/star</td>
      <td>GET</td>
      <td rowspan="2">`year`년 `month` 월 `day` 일 할 일</td>
      <td>READS</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>CREATE</td>
    </tr>
    <tr>
      <td rowspan="2">/api/sky/`year`/`month`/`day`/star/`star_id`</td>
      <td>PUT</td>
      <td rowspan="2">`year`, `month`, `day`, `star_id`</td>
      <td rowspan="2">`year`년 `month` 월 `day` 일 할 일 `star_id`</td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>DELETE</td>
    </tr>
    <tr>
      <td rowspan="4">/api/sky/`year`/`month`/`day`/star/`star_id`/cloud</td>
      <td>GET</td>
      <td rowspan="4">`year`, `month`, `day`, `star_id`</td>
      <td rowspan="4">`year`년 `month` 월 `day` 일 할 일 `star_id` 소감</td>
      <td>READ</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>CREATE</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>UPDATE</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>DELETE</td>
    </tr>
  </tbody>
</table>

## DB

```mermaid
erDiagram
    USER {
        int id
        string username
        string password
    }
    SKY {  
        int id
        date date
        int user_id
        text content
    }
    STAR {
        int id
        int sky_id
        string content
        int howMuch
    }
    CLOUD {
        int id
        int sky_or_star_id
        int emotion_id
        string content
        string emotion
        string[] image_path
    }
    EMOTION{
        int id
        string feel
        string image_path
    }
    IMAGE {
        string path
    }
    USER ||--o{ SKY : write
    CLOUD |o--o{ IMAGE : append
    SKY ||--|{ STAR : doIt
    SKY ||--|| CLOUD : howAboutToday
    STAR ||--|| CLOUD : howAbout
    CLOUD }o--|| EMOTION : feel
    EMOTION ||--|| IMAGE : append

```
