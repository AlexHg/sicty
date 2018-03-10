-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-03-2018 a las 00:26:06
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sicty`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo`
--

CREATE TABLE `archivo` (
  `idarchivo` int(11) NOT NULL,
  `ruta` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL,
  `idmensaje` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `archivo`
--

INSERT INTO `archivo` (`idarchivo`, `ruta`, `tipo`, `idmensaje`) VALUES
(1, '2.pdf', 1, 3),
(2, '2.pdf', 1, 3),
(3, 'a.jpg', 1, 3),
(4, 'a.pdf', 1, 1),
(5, 'abc.pdf', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `prioridad` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `nombre`, `prioridad`) VALUES
(0, 'Software', 1),
(1, 'Hardware', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idempresa` int(11) NOT NULL,
  `empresacol` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`idempresa`, `empresacol`) VALUES
(0, 'Google'),
(1, 'PentaSensorial'),
(2, 'Instituto Politecnico Nacional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `idmensaje` int(11) NOT NULL,
  `idreporte` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `cuerpo` text COLLATE utf8_spanish_ci,
  `isnota` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `mensaje`
--

INSERT INTO `mensaje` (`idmensaje`, `idreporte`, `fecha`, `cuerpo`, `isnota`) VALUES
(1, 1, '2018-03-05', 'dsafsdfa', 0),
(2, 1, '2018-03-05', 'body', 0),
(3, 2, '2018-03-05', 'body', 0),
(4, 1, '2018-03-06', 'algo', 0),
(6, 1, '2018-03-01', 'asdasd', 1),
(7, 1, '2018-03-05', 'lakjdlasdja djas dkasñd ajsd sdl jsñ da', 0),
(8, 2, '2018-03-05', 'lakjdlasdja djas dkasñd ajsd sdl jsñ da', 0),
(9, 1, '2018-03-02', 'seran 200%', 1),
(10, 2, '2018-03-09', 'reporte', 1),
(11, 2, '2018-09-10', 'Prueba de Cometario', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `msjcliente`
--

CREATE TABLE `msjcliente` (
  `idmensajecliente` int(11) NOT NULL,
  `correocliente` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `msjcliente`
--

INSERT INTO `msjcliente` (`idmensajecliente`, `correocliente`) VALUES
(1, 'correo@hotmail.com'),
(3, 'correo@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `msjusuario`
--

CREATE TABLE `msjusuario` (
  `idmensaje` int(11) NOT NULL,
  `idusuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `msjusuario`
--

INSERT INTO `msjusuario` (`idmensaje`, `idusuario`) VALUES
(7, 1),
(8, 1),
(11, 1),
(4, 2),
(9, 4),
(6, 10),
(10, 10),
(2, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `idreporte` int(11) NOT NULL,
  `fechaini` date DEFAULT NULL,
  `fechamod` date DEFAULT NULL,
  `idestado` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `idcategoria` int(11) DEFAULT NULL,
  `idoperador` int(11) DEFAULT NULL,
  `prioridad` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `reporte`
--

INSERT INTO `reporte` (`idreporte`, `fechaini`, `fechamod`, `idestado`, `idcategoria`, `idoperador`, `prioridad`) VALUES
(1, '2018-03-03', '2018-03-02', 'abierto', 1, 2, 0),
(2, '2018-03-03', '2018-03-03', 'abierto', 0, 2, 0),
(3, '2018-03-03', '2018-03-03', 'abierto', 1, 3, 0),
(4, '2018-03-14', '2018-03-22', 'abierto', 1, 1, 0),
(5, '2018-03-10', '2018-03-10', 'abierto', 1, 1, 0),
(7, '2018-03-10', '2018-03-10', 'abierto', 1, 1, 0),
(19, '2018-03-03', '2018-03-03', 'abierto', 0, 2, 0),
(20, '2018-03-05', '2018-03-05', 'abierto', 1, 2, 0),
(21, '2018-03-12', '2018-03-12', 'abierto', 1, 2, 0),
(22, '2018-03-12', '2018-03-12', 'abierto', 0, 2, 0),
(23, '2018-03-12', '2018-03-12', 'abierto', 0, 2, 0),
(24, '2018-03-12', '2018-03-12', 'abierto', 0, 2, 0),
(25, '2018-03-01', '2018-03-05', 'abierto', 0, 1, 0),
(26, '2018-03-12', '2018-03-12', 'abierto', 0, 2, 0),
(27, '2018-03-12', '2018-03-12', 'abierto', 0, 2, 0),
(29, '2018-03-12', '2018-03-12', 'abierto', 0, 2, 0),
(30, NULL, NULL, 'abierto', 0, 1, 0),
(31, NULL, NULL, 'abierto', 0, 1, 0),
(32, NULL, NULL, 'abierto', 0, 1, 0),
(33, '2018-03-12', '2018-03-12', 'abierto', 0, 1, 0),
(34, '2018-05-12', '2018-05-12', 'abierto', 1, 2, 0),
(35, '2018-05-12', '2018-05-12', 'abierto', 1, 2, 0),
(36, '2018-03-12', '2018-03-12', 'abierto', 0, 1, 0),
(37, '2018-03-05', '2018-03-05', 'abierto', 0, 1, 0),
(38, '2018-03-05', '2018-03-05', 'abierto', 0, 1, 0),
(39, '2018-03-05', '2018-03-05', 'abierto', 1, 2, 0),
(40, '2018-03-05', '2018-03-05', 'abierto', 0, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_empresa`
--

CREATE TABLE `reporte_empresa` (
  `idreporte_empresa` int(11) NOT NULL,
  `idempresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `reporte_empresa`
--

INSERT INTO `reporte_empresa` (`idreporte_empresa`, `idempresa`) VALUES
(1, 0),
(3, 1),
(25, 1),
(26, 1),
(27, 1),
(29, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte_local`
--

CREATE TABLE `reporte_local` (
  `idreporte_local` int(11) NOT NULL,
  `correocliente` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono1` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefonos` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `propiedades` text COLLATE utf8_spanish_ci,
  `fechaentrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `reporte_local`
--

INSERT INTO `reporte_local` (`idreporte_local`, `correocliente`, `nombre`, `telefono1`, `telefonos`, `propiedades`, `fechaentrega`) VALUES
(2, 'cliente1@hotmail.com', 'Mauricio Bautista', '5567558855', '5578985665', '{modelo:IphoneX,color:negro}', '0000-00-00'),
(4, 'cliente2@hotmail.com', 'cliente2 cliente2 cliente2', '5587789898', '6456456464', '{modelo:IphoneX,color:negro}\r\n', '0000-00-00'),
(18, 'cliente1@hotmail.com', 'Mauricio Bautista', '5567558855', '5578985665', '{modelo:IphoneX,color:negro}', '0000-00-00'),
(19, 'cliente1@hotmail.com', 'Juan Carlos Sanchez', '5567558855', '5578985665', '{modelo:IphoneX,color:negro}', '0000-00-00'),
(20, 'cliente', 'clietenombre', '5555555555', '5555555555', 'sdafasdfasdf', '0000-00-00'),
(22, 'correo1@hotmail.com', 'Juan Morales', '5898782655', NULL, '{color:red}', '0000-00-00'),
(23, 'correo1@hotmail.com', 'Juan Morales', '5898782655', '5596898774', '{color:red}', '0000-00-00'),
(24, 'correo1@hotmail.com', 'Juan Morales', '5898782655', '5596898774', '{color:red}', '0000-00-00'),
(30, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00'),
(31, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00'),
(32, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00'),
(33, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00'),
(34, 'correobien@membercheap.com', 'Mario lopez', '5548789887', '5512124578', '{color:red,modelo:iphoneX} ', '0000-00-00'),
(35, 'correobien@membercheap.com', 'Mario lopez', '5548789887', '5512124578', '{color:red,modelo:iphoneX} ', '0000-00-00'),
(36, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00'),
(37, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00'),
(38, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00'),
(39, 'mariolopez@hotmail.com', 'Mario Lopez Ruiz', '5567589696', '0000000000', '{color:red,modelo:iphoneX,precio:15151} ', '0000-00-00'),
(40, 'mail@hotmail.com', 'Juan Carlos Sanchez ', '5567582223', '5500000000', '{color:red} ', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL,
  `correo` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(225) COLLATE utf8_spanish_ci DEFAULT NULL,
  `idrol` int(11) DEFAULT NULL,
  `contra` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `correo`, `nombre`, `idrol`, `contra`) VALUES
(1, 'char2296@hotmail.com', 'Juan Carlos Sanchez Trejo', 1, 'charly123'),
(2, 'alex@hotmail.com', 'Alejandro Hernandez', 1, 'alex123'),
(3, 'root@hotmail.com', 'David De la Cruz Mari ', 1, 'david123'),
(4, 'correo1@gmail.com', 'Usuario 1', 1, '123'),
(6, 'correo2@gmail.com', 'Juan CarlosSanchez', 1, '123'),
(10, 'correoB@gmail.com', 'NombreA', 1, '12345'),
(12, 'correoC@gmail.com', 'NombreC', 1, '123'),
(14, 'root', 'Juan Carlos', 1, '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD PRIMARY KEY (`idarchivo`),
  ADD UNIQUE KEY `idarchivo_UNIQUE` (`idarchivo`),
  ADD KEY `idmensaje_idx` (`idmensaje`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`),
  ADD UNIQUE KEY `idcategoria_UNIQUE` (`idcategoria`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idempresa`),
  ADD UNIQUE KEY `idempresa_UNIQUE` (`idempresa`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`idmensaje`),
  ADD UNIQUE KEY `idmensaje_UNIQUE` (`idmensaje`),
  ADD KEY `reporte_idx` (`idreporte`);

--
-- Indices de la tabla `msjcliente`
--
ALTER TABLE `msjcliente`
  ADD PRIMARY KEY (`idmensajecliente`);

--
-- Indices de la tabla `msjusuario`
--
ALTER TABLE `msjusuario`
  ADD PRIMARY KEY (`idmensaje`),
  ADD KEY `user_idx` (`idusuario`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`idreporte`),
  ADD UNIQUE KEY `idreporte_UNIQUE` (`idreporte`),
  ADD KEY `idoperador_idx` (`idoperador`),
  ADD KEY `idcategoria_idx` (`idcategoria`);

--
-- Indices de la tabla `reporte_empresa`
--
ALTER TABLE `reporte_empresa`
  ADD PRIMARY KEY (`idreporte_empresa`),
  ADD KEY `idempresa_idx` (`idempresa`),
  ADD KEY `fk_reporte_empresa_reporte1_idx` (`idreporte_empresa`);

--
-- Indices de la tabla `reporte_local`
--
ALTER TABLE `reporte_local`
  ADD PRIMARY KEY (`idreporte_local`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `idusuario_UNIQUE` (`idusuario`),
  ADD UNIQUE KEY `correo_UNIQUE` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo`
--
ALTER TABLE `archivo`
  MODIFY `idarchivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `idmensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `idreporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD CONSTRAINT `idmensajed` FOREIGN KEY (`idmensaje`) REFERENCES `mensaje` (`idmensaje`);

--
-- Filtros para la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `reporte` FOREIGN KEY (`idreporte`) REFERENCES `reporte` (`idreporte`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `msjcliente`
--
ALTER TABLE `msjcliente`
  ADD CONSTRAINT `mensajesc` FOREIGN KEY (`idmensajecliente`) REFERENCES `mensaje` (`idmensaje`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `msjusuario`
--
ALTER TABLE `msjusuario`
  ADD CONSTRAINT `mensaje` FOREIGN KEY (`idmensaje`) REFERENCES `mensaje` (`idmensaje`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `idcategoria` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `idoperador` FOREIGN KEY (`idoperador`) REFERENCES `usuario` (`idusuario`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `reporte_empresa`
--
ALTER TABLE `reporte_empresa`
  ADD CONSTRAINT `fk_reporte_empresa_reporte1` FOREIGN KEY (`idreporte_empresa`) REFERENCES `reporte` (`idreporte`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `idempresa` FOREIGN KEY (`idempresa`) REFERENCES `empresa` (`idempresa`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
