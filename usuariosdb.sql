use proyectofinal;
create table usuarios(
idUsuarios int not null auto_increment primary key,
nombre varchar(80) not null,
edad int,
email varchar(80) not null,
pass varchar(200) not null
)
select * from usuarios;
