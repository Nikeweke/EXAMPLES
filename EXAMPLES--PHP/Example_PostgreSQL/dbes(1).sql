-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Апр 23 2016 г., 17:19
-- Версия сервера: 10.1.10-MariaDB
-- Версия PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `dbes`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `del_emp` (`var1` INT)  DELETE FROM employees WHERE id = var1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_emp` (IN `var1` VARCHAR(50), IN `var2` VARCHAR(50), IN `var3` VARCHAR(50), IN `var4` VARCHAR(50))  BEGIN 
INSERT INTO employees(surname, name, posada, kraina) VALUES(var1, var2, var3, var4);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `posada` varchar(50) DEFAULT NULL,
  `kraina` varchar(50) DEFAULT NULL,
  `time_reg` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `employees`
--

INSERT INTO `employees` (`id`, `name`, `surname`, `posada`, `kraina`, `time_reg`) VALUES
(40, 'фывфыв', 'фывыфв', '1', '1', '2016-04-23 15:15:33'),
(39, 'gfh', 'gfh', '1', '1', '2016-04-23 15:15:03');

--
-- Триггеры `employees`
--
DELIMITER $$
CREATE TRIGGER `del_emp` BEFORE DELETE ON `employees` FOR EACH ROW BEGIN
   INSERT INTO log Set action = 'delete in employees';
   DELETE FROM kod WHERE kod.id = OLD.id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ins_emp` AFTER INSERT ON `employees` FOR EACH ROW INSERT INTO log Set action = 'insert in employees'
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `emp_kod`
--
CREATE TABLE `emp_kod` (
`name` varchar(50)
,`kod` varchar(255)
);

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `emp_kr_pos`
--
CREATE TABLE `emp_kr_pos` (
`id` int(11)
,`name` varchar(50)
,`surname` varchar(50)
,`kraina` varchar(50)
,`posada` varchar(50)
);

-- --------------------------------------------------------

--
-- Структура таблицы `kod`
--

CREATE TABLE `kod` (
  `id` int(11) NOT NULL,
  `kod` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `kod`
--

INSERT INTO `kod` (`id`, `kod`, `time`) VALUES
(39, 'lKf7V4anDSKQzGiAIVuK', '2016-04-23 15:15:03'),
(40, 'irZTVBoeW9PJX4EPAtfV', '2016-04-23 15:15:33');

-- --------------------------------------------------------

--
-- Структура таблицы `kraini`
--

CREATE TABLE `kraini` (
  `id` int(11) NOT NULL,
  `kraina` varchar(50) DEFAULT NULL,
  `about` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `kraini`
--

INSERT INTO `kraini` (`id`, `kraina`, `about`) VALUES
(1, '1', 'UKRAINE'),
(2, '2', 'USA'),
(3, '3', 'AFGANISTAN'),
(4, '4', 'RUSSIA'),
(5, '5', 'GERMANY');

-- --------------------------------------------------------

--
-- Структура таблицы `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `action` varchar(50) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `log`
--

INSERT INTO `log` (`id`, `action`, `time`) VALUES
(23, 'insert in employees', '2016-04-23 15:15:33'),
(22, 'delete in employees', '2016-04-23 15:15:18'),
(21, 'insert in employees', '2016-04-23 15:15:03'),
(20, 'insert in employees', '2016-04-22 17:02:05'),
(19, 'delete in employees', '2016-04-22 16:56:20'),
(18, 'delete in employees', '2016-04-22 16:56:17'),
(17, 'insert in employees', '2016-04-22 16:55:57'),
(16, 'insert in employees', '2016-04-22 16:55:30');

-- --------------------------------------------------------

--
-- Структура таблицы `posadi`
--

CREATE TABLE `posadi` (
  `id` int(11) NOT NULL,
  `posada` varchar(50) DEFAULT NULL,
  `about` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `posadi`
--

INSERT INTO `posadi` (`id`, `posada`, `about`) VALUES
(1, '1', 'Director'),
(2, '2', 'PHP-scenarist'),
(3, '3', 'JS-scenarist'),
(4, '4', 'HTML-designer'),
(5, '5', 'Courier');

-- --------------------------------------------------------

--
-- Структура для представления `emp_kod`
--
DROP TABLE IF EXISTS `emp_kod`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `emp_kod`  AS  select `employees`.`name` AS `name`,`kod`.`kod` AS `kod` from (`employees` join `kod`) where (`employees`.`id` = `kod`.`id`) ;

-- --------------------------------------------------------

--
-- Структура для представления `emp_kr_pos`
--
DROP TABLE IF EXISTS `emp_kr_pos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `emp_kr_pos`  AS  select `employees`.`id` AS `id`,`employees`.`name` AS `name`,`employees`.`surname` AS `surname`,`kraini`.`about` AS `kraina`,`posadi`.`about` AS `posada` from ((`posadi` join `kraini`) join `employees`) where ((`posadi`.`posada` = `employees`.`posada`) and (`kraini`.`kraina` = `employees`.`kraina`)) ;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `kod`
--
ALTER TABLE `kod`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `kraini`
--
ALTER TABLE `kraini`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `posadi`
--
ALTER TABLE `posadi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT для таблицы `kod`
--
ALTER TABLE `kod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT для таблицы `kraini`
--
ALTER TABLE `kraini`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT для таблицы `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT для таблицы `posadi`
--
ALTER TABLE `posadi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
