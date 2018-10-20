/* Lógico1 banco: */

CREATE TABLE Coleta (
    id_coleta int PRIMARY KEY,
    Data date,
    Hora time,
    Temp double,
    Umi double,
    FK_Arduino_idArduino int
);

CREATE TABLE Arduino (
    idArduino int PRIMARY KEY,
    mdSensor varchar(20)
);

CREATE TABLE Localidade (
    id_loc int PRIMARY KEY,
    CEP char(8),
    estado varchar(30),
    cidade varchar(30),
    Endereco varchar(70),
    nomeLab varchar(30)
);

CREATE TABLE localLab (
    id_locLab int PRIMARY KEY,
    descLoc varchar(30)
);

CREATE TABLE usuarios (
    idUsuario int PRIMARY KEY UNIQUE,
    CPF char(11),
    email varchar(50),
    nome varchar(50),
    telefone varchar(12),
    FK_gruposAcesso_id_grupo int
);

CREATE TABLE gruposAcesso (
    id_grupo int PRIMARY KEY,
    nomeGrupo varchar(20),
    NivelAcesso varchar(20)
);

CREATE TABLE ArduinoLocalidade (
    FK_Localidade_id_loc int,
    FK_Arduino_idArduino int,
    data_instalado date
);

CREATE TABLE ArduinoLab (
    FK_lugarInstalacao_id_locLab int,
    FK_Arduino_idArduino int,
    dtInst date
);

CREATE TABLE locTrabalho (
    FK_Usuario_idUsuario int,
    FK_Localidade_id_loc int
);
 
ALTER TABLE Coleta ADD CONSTRAINT FK_Coleta_1
    FOREIGN KEY (FK_Arduino_idArduino)
    REFERENCES Arduino (idArduino)
    ON DELETE RESTRICT ON UPDATE RESTRICT;
 
ALTER TABLE usuarios ADD CONSTRAINT FK_usuarios_1
    FOREIGN KEY (FK_gruposAcesso_id_grupo)
    REFERENCES gruposAcesso (id_grupo)
    ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE ArduinoLocalidade ADD CONSTRAINT FK_ArduinoLocalidade_0
    FOREIGN KEY (FK_Localidade_id_loc)
    REFERENCES Localidade (id_loc)
    ON DELETE RESTRICT ON UPDATE RESTRICT;
 
ALTER TABLE ArduinoLocalidade ADD CONSTRAINT FK_ArduinoLocalidade_1
    FOREIGN KEY (FK_Arduino_idArduino)
    REFERENCES Arduino (idArduino)
    ON DELETE RESTRICT ON UPDATE RESTRICT;
 
ALTER TABLE ArduinoLab ADD CONSTRAINT FK_ArduinoLab_0
    FOREIGN KEY (FK_lugarInstalacao_id_locLab)
    REFERENCES localLab (id_locLab)
    ON DELETE RESTRICT ON UPDATE RESTRICT;
 
ALTER TABLE ArduinoLab ADD CONSTRAINT FK_ArduinoLab_1
    FOREIGN KEY (FK_Arduino_idArduino)
    REFERENCES Arduino (idArduino)
    ON DELETE RESTRICT ON UPDATE RESTRICT;
 
ALTER TABLE locTrabalho ADD CONSTRAINT FK_locTrabalho_0
    FOREIGN KEY (FK_Usuario_idUsuario)
    REFERENCES usuarios (idUsuario)
    ON DELETE RESTRICT ON UPDATE RESTRICT;
 
ALTER TABLE locTrabalho ADD CONSTRAINT FK_locTrabalho_1
    FOREIGN KEY (FK_Localidade_id_loc)
    REFERENCES Localidade (id_loc)
    ON DELETE RESTRICT ON UPDATE RESTRICT;