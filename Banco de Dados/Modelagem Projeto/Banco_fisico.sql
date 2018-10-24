CREATE TABLE Arduino (
    id_Arduino int PRIMARY KEY IDENTITY(1,1),
    nome_arduino varchar(15)
);



CREATE TABLE Localidade (
    id_loc int PRIMARY KEY IDENTITY(1,1),
    CEP char(8),
    estado varchar(30),
    cidade varchar(30),
    Endereco varchar(70),
    nm_Lab varchar(30)
);

CREATE TABLE Lab (
    id_locLab int PRIMARY KEY IDENTITY(1,1),
    desc_Loc varchar(30),
	FK_loc int
	CONSTRAINT FK_lugar_loc FOREIGN KEY (FK_loc) REFERENCES localidade(id_loc)
);


CREATE TABLE loc_arduino (
    FK_lab int,
    FK_Arduino int,
	data_ativacao date,
    data_desativacao date,
	CONSTRAINT FK_lab_loc FOREIGN KEY (FK_lab) REFERENCES lab(id_locLab),
	CONSTRAINT FK_Arduino_loc FOREIGN KEY (FK_Arduino) REFERENCES arduino(id_Arduino)
);

CREATE TABLE Coleta (
    id_coleta int PRIMARY KEY IDENTITY(1,1),
    Data date,
    Hora time,
    Temp decimal,
    Umi decimal,
	FK_arduino int,
	CONSTRAINT FK_arduinoColeta FOREIGN KEY (FK_arduino) REFERENCES arduino(id_arduino)
);

CREATE TABLE gruposAcesso (
    id_grupo int PRIMARY KEY IDENTITY(1,1),
    nm_Grupo varchar(20) unique,
);

CREATE TABLE usuarios (
    idUsuario int PRIMARY KEY IDENTITY(1,1),
	senha VARBINARY (MAX),
    CPF char(11),
    email varchar(50),
    nm_usuario varchar(50),
    telefone varchar(12),
	FK_acesso int,
	FK_loc_trabalho int,
    CONSTRAINT FK_grupo_acesso FOREIGN KEY (FK_acesso) REFERENCES gruposacesso(id_grupo),
	CONSTRAINT FK_local_trabalho FOREIGN KEY (FK_loc_trabalho) REFERENCES localidade(id_loc)
);