# Backend Test KSG

## Описание

Небольшой веб-сервер с двумя эндпоинтами: получение списка предметов и списание баланса пользователя. 
Выполнен в рамках тестового задания

## Установка и запуск

1. Клонирование репозиттория:
  ```sh
    git clone https://github.com/xfter16/backend-test-ksg.git
    cd backend-test-ksg
  ```
2. Установка зависимостей:
  ```sh
    npm install
  ```
3. Далее необходимо создать файл .env с переменными окружения:
  ```env
    PORT=3000
    DATABASE_URL=your_database_url
    CACHE_TTL=600
    SKINPORT_API_URL=https://api.skinport.com/v1/items
    SKINPORT_APP_ID=730
    SKINPORT_CURRENCY=USD
  ```
4. Запуск сервера:
  ```sh
    npm run build
    npm run start
  ```

## Эндпоинты

### GET /items
Возвращает список предметов из API Skinport с минимальными ценами.

### POST /user/balance/:userId
Списание баланса пользователя.

__Параметры__:
`userId` ID пользователя (передается в URL)
```ts
  amount: number // Сумма для списания
```

### GET /user/balance/:userId
Возвращает баланс пользователя по его ID.

### Запуск тестов

Для запуска тестов используйте команду:

```sh
npm test
```
