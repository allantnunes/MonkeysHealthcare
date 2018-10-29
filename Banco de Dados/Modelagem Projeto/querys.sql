select * from coleta where FK_arduino = 3;

truncate table localidade;
go
select * from lab;
go
insert into Localidade values 
					  
					  ('06150061', 'São Paulo','Osasco', 'Rua piracicaba 7','Fleury');
delete from localidade where id_loc in (11); 

update localidade SET id_loc = 1 where nm_Lab = 'Veloso Vacinas';


insert into lab values
				('Geladeira 1', 9),
				('Geladeira 2', 9),
				('Geladeira 3', 9),
				('Geladeira vacinas', 10),
				('Geladeira remédios', 10);

insert into loc_arduino (fk_lab, FK_Arduino, data_ativacao) values
				(1, 1, CONVERT(date, SYSDATETIME())),
				(2, 2, CONVERT(date, SYSDATETIME())),
				(3, 3, CONVERT(date, SYSDATETIME())),
				(4, 4, CONVERT(date, SYSDATETIME())),
				(5, 5, CONVERT(date, SYSDATETIME()));

select nm_Lab ,desc_loc, id_Arduino, nm_arduino  from lab, localidade, loc_arduino, Arduino where id_loc = fk_loc and FK_lab = id_locLab and FK_Arduino = id_Arduino;
				 




/****** Script do comando SelectTopNRows de SSMS  ******/
SELECT TOP (1000) [id_loc]
      ,[CEP]
      ,[estado]
      ,[cidade]
      ,[Endereco]
      ,[nm_Lab]
  FROM [dbo].[Localidade]