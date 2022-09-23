

USE world;
SHOW TABLES; 
DESC city;

/*
select 필드명 from 테이블명
    where 조건 
    group by 필드명
    having 그룹 조건
    order by 필드명 순서
    limit 숫자 offset 숫자
    join 테이블명 
    on 조인 조건;
*/

SELECT * FROM city;
SELECT * FROM city WHERE countrycode='KOR'; # 필드명에 대소문자 구별은 암함
SELECT * FROM city WHERE District='Kwangju'; # 
SELECT NAME,population FROM city WHERE CountryCode='KOR' # 한국에 있는 도시만
SELECT `Name`,population FROM city WHERE CountryCode='KOR'; #도시이름과 인구수
SELECT COUNT(*) FROM city; # 도시수를 확인
SELECT distinct district FROM city WHERE countrycode='KOR'; 중복되는 거 없이 출력

# 호남지역 도시
SELECT * FROM city WHERE district='Kwangju' 
	OR district='Chollabuk'OR district='Chollanam';

# 한국의 100만보다 큰 도시중에 인구수가 짝수 인 것
SELECT * FROM city WHERE countrycode = 'KOR'
	AND population >1000000 AND population%2=0;

# 한국의 100만보다 크고 200만 보다 작은도시
SELECT * FROM city WHERE countrycode = 'KOR'
	AND population >1000000 AND population<2000000;

    # 한국의 100만보다 크고 200만 보다 작은도시
SELECT * FROM city WHERE countrycode = 'KOR'
	AND population BETWEEN 1000000 AND 2000000;

#전라도의 도시
SELECT * FROM city WHERE countrycode='KOR'
	AND district LIKE 'Cholla%';


#인구수가 1000만 이상에 도시를 인구수의 내림차순으로 조회
SELECT * FROM city WHERE population >8000000 ORDER BY population DESC;

#전라남도 도시 이름순
SELECT * FROM city WHERE district='Chollanam' ORDER BY NAME;


#한국의 도시를 distict 오름차순 name 도 오름차순
SELECT * FROM city WHERE countrycode='KOR'
	ORDER BY district, NAME;

#count star count(*) -건수
#한국의 도시 수
SELECT  COUNT(*) FROM city WHERE countrycode='KOR';
#한국의 인구수
SELECT  SUM(population) FROM city WHERE countrycode='KOR';
SELECT  AVG(population) AS 평균 FROM city WHERE countrycode='KOR'; #aliasing

#count star count(*) -건수
SELECT  sum(population),avg(population),max(population),min(population),COUNT(*) 
	FROM city WHERE countrycode='KOR'; #aliasing

# 광역시도별로 인구수
SELECT district, SUM(population) FROM city WHERE countrycode ='kor'
	GROUP BY district;


# 한국의 광역시도
SELECT GROUP_CONCAT(DISTINCT district) FROM city WHERE countrycode='kor';

# 공역시도별 도시의 갯수
SELECT district, COUNT(*) FROM city WHERE countrycode='kor'
	GROUP BY district ORDER BY COUNT(*) DESC, district;

# 광역시도별 도시의 갯수가 5개 이상
SELECT district, COUNT(*) FROM city WHERE countrycode='kor'
	GROUP BY district HAVING COUNT(*) >=5;

# 광역시도별 도시의 갯수가 5개 이상 내림차순 정렬
SELECT district, COUNT(*) FROM city WHERE countrycode='kor'
	GROUP BY district HAVING COUNT(*) >=5 ORDER BY COUNT(*) desc;

# 도시 합이 50개 이상인 나라
SELECT countrycode,COUNT(*) FROM city
	GROUP BY countrycode HAVING COUNT(*) >=50 ORDER BY COUNT(*) desc;

# 도시의 인구가 많은 10개 국가코드
SELECT countrycode,SUM(population) FROM city
	GROUP BY countrycode ORDER BY SUM(population) DESC
	LIMIT 10;

# 도시의 인구가 많은 국가코드 6~10위까지
SELECT countrycode,SUM(population) FROM city
	GROUP BY countrycode ORDER BY SUM(population) DESC
	LIMIT 5 OFFSET 5;

#도시의 인구가 많은 국가 6 ~ 10위까지
SELECT country.name, SUM(city.population) FROM city
	INNER JOIN country ON city.CountryCode=country.code
	GROUP BY city.countrycode ORDER BY SUM(city.population) DESC
	LIMIT 5 OFFSET 5;

# 인구가 많은 전세계 도시 top 10
SELECT country.Name, city.Name, city.Population FROM city
	JOIN country ON city.CountryCode = country.code
	ORDER BY city.Population DESC LIMIT 10;


SELECT continent, COUNT(*) FROM country
	GROUP BY continent ORDER BY COUNT(*) DESC;


#대륙별로 국가숫자, GNP의 합, 평균 국가별 GNP
SELECT continent, COUNT(*), round(SUM(GNP)), round(AVG(GNP)) FROM country
	GROUP BY continent ORDER BY COUNT(*) DESC;
-- round() => 소숫점 자리 날림
--round(,-3) => 천의 자리 까지 날리고 000으로 채움

# 아시아 대륙에서 인구가 가장 많은 도시 10개를 내림순으로 보여줄 것
#(대륙명, 국가명, 도시명, 인구수)
SELECT country.Continent, country.Name , city.Name , city.Population FROM city
	JOIN country ON city.CountryCode = country.Code
	GROUP BY city.Name ORDER BY city.Population DESC LIMIT 10;


#전세계에서 인구가 가장 많은 10개 도시에서 사용하는 공식언어 (도시명, 인구수, 언어명)
SELECT city.Name, city.Population, countrylanguage.`Language` FROM city
	JOIN countrylanguage ON city.CountryCode = countrylanguage.CountryCode AND countrylanguage.IsOfficial = 'T'
	GROUP BY city.Name ORDER BY  city.Population DESC LIMIT 10;
--

SELECT c.Name, c.Population, l.`Language` FROM city AS c
	JOIN countrylanguage AS l ON c.CountryCode = l.CountryCode
	WHERE l.IsOfficial = 'T'
	ORDER BY c.Population DESC
	limit 10

--update 테이블명
--	set 필드명 =값, 필드명 = 값, ....
--	where 조건;
UPDATE city
	SET NAME='Gwangju', district = 'Gwangju'
	WHERE id=2336;		
	
SELECT * FROM city WHERE NAME = 'gwangju' 


-- key
-- primary key(기본키)
#전람남도 도시의 인구를 20만으로 변경
UPDATE city
	SET population = 200000
	WHERE district = 'chollanam';


--insert into	테이블명
--	(필드명)				# 필드명을 사용하면 일부 필드만 데이터 추가, 사용하지 않으면 모든 필드에 데이터 추가
--	values (필드명에 대한 값)

INSERT INTO city
	(NAME, countrycode, district, population)
	VALUES ('Haenam','KOR','Chollanam', 100000);

INSERT INTO city
	VALUES (DEFAULT, 'Jangsung', 'KOR','Chollanam', 100000);


UPDATE city, (SELECT * FROM city WHERE district='Chollanam') b
	SET city.Population = b.population + 50000
	WHERE city.id=b.id;

delete from 테이블명
	where 조건

#테이블의 모든 데이터 삭제
TRUNCATE TABLE [테이블명]
#테이블의 이름 변경
RENAME TABLE tigers TO kia_tigers;


ALTER TABLE kia_tigers
	#칼럼 추가
	ADD isDeleted INT DEFAULT 0;
	#칼럼 이름 바꾸기
	CHANGE `POSITION` `position` VARCHAR(10);
SELECT * FROM kia_tigersworld


CREATE TABLE gis.test(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(10)test
) AUTO_INCREMENT=100;



# inner join
SELECT song.sid, girl_group.name, girl_group.debut, song.title, song.lyrics  
	FROM girl_group									#left
	JOIN song 										#right
	ON song.sid = girl_group.hit_song_id 


# left outer join
SELECT song.sid, girl_group.name, girl_group.debut, song.title, song.lyrics  
	FROM song									#left
	LEFT outer JOIN girl_group 							#right
	ON song.sid = girl_group.hit_song_id 



# right outer join
SELECT song.sid, girl_group.name, girl_group.debut, song.title, song.lyrics  
	FROM song									#left
	RIGHT outer JOIN girl_group 							#right
	ON song.sid = girl_group.hit_song_id 


# full outer join
SELECT song.sid, girl_group.name, girl_group.debut, song.title, song.lyrics  
	FROM song									#left
	LEFT outer JOIN girl_group 							#right
	ON song.sid = girl_group.hit_song_id
UNION
SELECT song.sid, girl_group.name, girl_group.debut, song.title, song.lyrics  
	FROM song									#left
	RIGHT outer JOIN girl_group 							#right
	ON song.sid = girl_group.hit_song_id 

#데뷔 일짜가 빠른  5개의 걸그룹의 히트송은(그룹명, 곡명)
SELECT girl_group.name, song.title ,girl_group.debut
	FROM girl_group
	JOIN song
	ON girl_group.hit_song_id = song.sid
	ORDER BY girl_group.debut LIMIT 5; 