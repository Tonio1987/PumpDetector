-- --------------------------------------------------------
-- Hôte :                        192.168.0.21
-- Version du serveur:           8.0.19-0ubuntu0.19.10.3 - (Ubuntu)
-- SE du serveur:                Linux
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour pump_detector
CREATE DATABASE IF NOT EXISTS `pump_detector` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pump_detector`;

-- Listage de la structure de la table pump_detector. TR_PARAMETER_PMT
CREATE TABLE IF NOT EXISTS `TR_PARAMETER_PMT` (
  `PMT_ID` int DEFAULT NULL,
  `PMT_ALGO` varchar(100) DEFAULT NULL,
  `PMT_TYPE` varchar(100) DEFAULT NULL,
  `PMT_NAME` varchar(100) DEFAULT NULL,
  `PMT_DESCR` varchar(300) DEFAULT NULL,
  `PMT_VALUE` decimal(22,9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table pump_detector. TS_CRON_TASK_CRT
CREATE TABLE IF NOT EXISTS `TS_CRON_TASK_CRT` (
  `CRT_ID` int DEFAULT NULL,
  `CRT_NAME` varchar(100) DEFAULT NULL,
  `CRT_CRON_EXPR` varchar(50) DEFAULT NULL,
  `CRT_ACTIVE` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table pump_detector. T_ALGO_AVG_VOL_TRADES_AVT
CREATE TABLE IF NOT EXISTS `T_ALGO_AVG_VOL_TRADES_AVT` (
  `AVT_ID` varchar(50) DEFAULT NULL,
  `AVT_DATETIME` datetime DEFAULT NULL,
  `AVT_SYMBOL` varchar(15) DEFAULT NULL,
  `AVT_AVG_VOLUME_TRADE` decimal(22,9) DEFAULT NULL,
  `AVT_NB_TRADES` decimal(22,9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table pump_detector. T_ALGO_EVOL_CRYPTO_EVC
CREATE TABLE IF NOT EXISTS `T_ALGO_EVOL_CRYPTO_EVC` (
  `EVC_ID` varchar(50) DEFAULT NULL,
  `EVC_DATETIME` datetime DEFAULT NULL,
  `EVC_SYMBOL` varchar(15) DEFAULT NULL,
  `EVC_EVOL_VOL_STATUS` varchar(10) DEFAULT NULL,
  `EVC_EVOL_NB_TRADES_STATUS` varchar(10) DEFAULT NULL,
  `EVC_EVOL_PRICE_STATUS` varchar(10) DEFAULT NULL,
  `EVC_EVOL_OP_CL_PRICE_STATUS` varchar(10) DEFAULT NULL,
  `EVC_EVOL_VOL` decimal(22,9) DEFAULT NULL,
  `EVC_EVOL_NB_TRADES` decimal(22,9) DEFAULT NULL,
  `EVC_EVOL_PRICE` decimal(22,9) DEFAULT NULL,
  `EVC_EVOL_OP_CR_PRICE` decimal(22,9) DEFAULT NULL,
  `EVC_LAST_INSERT` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table pump_detector. T_API_CANDLE_CAD
CREATE TABLE IF NOT EXISTS `T_API_CANDLE_CAD` (
  `CAD_ID` varchar(50) DEFAULT NULL,
  `CAD_DATETIME` datetime DEFAULT NULL,
  `CAD_SYMBOL` varchar(15) DEFAULT NULL,
  `CAD_OPEN_TIME` double DEFAULT NULL,
  `CAD_OPEN_DATETIME` datetime DEFAULT NULL,
  `CAD_OPEN_PRICE` decimal(22,9) DEFAULT NULL,
  `CAD_HIGH_PRICE` decimal(22,9) DEFAULT NULL,
  `CAD_LOW_PRICE` decimal(22,9) DEFAULT NULL,
  `CAD_CLOSE_PRICE` decimal(22,9) DEFAULT NULL,
  `CAD_VOLUME` decimal(22,9) DEFAULT NULL,
  `CAD_CLOSE_TIME` double DEFAULT NULL,
  `CAD_CLOSE_DATETIME` datetime DEFAULT NULL,
  `CAD_QUOTE_ASSET_VOLUME` decimal(22,9) DEFAULT NULL,
  `CAD_NUMBER_OF_TRADES` int DEFAULT NULL,
  `CAD_TAKER_BUY_BASE_ASSET_VOLUME` decimal(22,9) DEFAULT NULL,
  `CAD_TAKER_BUY_QUOTE_ASSET_VOLUME` decimal(22,9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table pump_detector. T_API_EXCHANGE_INFO_EXI
CREATE TABLE IF NOT EXISTS `T_API_EXCHANGE_INFO_EXI` (
  `EXI_ID` varchar(50) DEFAULT NULL,
  `EXI_DATETIME` datetime DEFAULT NULL,
  `EXI_SYMBOL` varchar(15) DEFAULT NULL,
  `EXI_STATUS` varchar(50) DEFAULT NULL,
  `EXI_BASE_ASSET` varchar(15) DEFAULT NULL,
  `EXI_BASE_ASSET_PRECISION` int DEFAULT NULL,
  `EXI_QUOTE_ASSET` varchar(15) DEFAULT NULL,
  `EXI_QUOTE_PRECISION` int DEFAULT NULL,
  `EXI_ICEBERG_ALLOWED` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Les données exportées n'étaient pas sélectionnées.

-- Listage de la structure de la table pump_detector. T_API_PRICE_PRI
CREATE TABLE IF NOT EXISTS `T_API_PRICE_PRI` (
  `PRI_ID` varchar(50) DEFAULT NULL,
  `PRI_DATETIME` datetime DEFAULT NULL,
  `PRI_SYMBOL` varchar(15) DEFAULT NULL,
  `PRI_PRICE` decimal(22,9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Les données exportées n'étaient pas sélectionnées.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
