# crud-post-file-MySQL API
/registration POST { "author": "", "password": ""};  Пользователь регистрируется в бд

/authorization  POST { "author": "", "password": ""};  Если пара верная, получаем токен

/edit POST { "message": "new message" } предъявляем  токен и добавляем текст поста

/upload POST предъявляем токен и добавляем файл с именем filedata

/delete DELETE предъявляем токен и можем удалить учетную запись

/users GET массив всех юзеров

/media/:filename , доступ к медиафайлу, указанному в поле mediaFileLink юзера
