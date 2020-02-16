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

-- Listage de la structure de la table pump_detector. TR_PARAMETER_PMT
CREATE TABLE IF NOT EXISTS `TR_PARAMETER_PMT` (
  `PMT_ID` int DEFAULT NULL,
  `PMT_ALGO` varchar(100) DEFAULT NULL,
  `PMT_TYPE` varchar(100) DEFAULT NULL,
  `PMT_NAME` varchar(100) DEFAULT NULL,
  `PMT_DESCR` varchar(300) DEFAULT NULL,
  `PMT_VALUE` decimal(22,9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table pump_detector.TR_PARAMETER_PMT : ~4 rows (environ)
/*!40000 ALTER TABLE `TR_PARAMETER_PMT` DISABLE KEYS */;
INSERT INTO `TR_PARAMETER_PMT` (`PMT_ID`, `PMT_ALGO`, `PMT_TYPE`, `PMT_NAME`, `PMT_DESCR`, `PMT_VALUE`) VALUES
	(2, 'PUMP_DETECTOR', 'WARNING', 'EVOL_VOLUME_WARNING', '% Evolution du volume déclenchant un warning', 500.000000000),
	(1, 'PUMP_DETECTOR', 'WARNING', 'EVOL_PRICE_WARNING', '% Evolution du prix déclenchant un warning', 1.500000000),
	(3, 'PUMP_DETECTOR', 'ALERT', 'EVOL_PRICE_ALERT', '% Evolution du prix déclenchant une alerte', 2.000000000),
	(4, 'PUMP_DETECTOR', 'ALERT', 'EVOL_PRICE_WARNING', '% Evolution du volume déclenchant une alerte', 1000.000000000);
/*!40000 ALTER TABLE `TR_PARAMETER_PMT` ENABLE KEYS */;

-- Listage de la structure de la table pump_detector. TS_CRON_TASK_CRT
CREATE TABLE IF NOT EXISTS `TS_CRON_TASK_CRT` (
  `CRT_ID` int DEFAULT NULL,
  `CRT_NAME` varchar(100) DEFAULT NULL,
  `CRT_CRON_EXPR` varchar(50) DEFAULT NULL,
  `CRT_ACTIVE` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table pump_detector.TS_CRON_TASK_CRT : ~4 rows (environ)
/*!40000 ALTER TABLE `TS_CRON_TASK_CRT` DISABLE KEYS */;
INSERT INTO `TS_CRON_TASK_CRT` (`CRT_ID`, `CRT_NAME`, `CRT_CRON_EXPR`, `CRT_ACTIVE`) VALUES
	(1, 'task_ServerOk', '0 */5 * * * *', 1),
	(2, 'task_LoadExchangeInfo', '0 */1 * * * *', 0),
	(3, 'task_LoadPrices', '0 */1 * * * *', 0),
	(4, 'task_LoadCandles', '5 */1 * * * *', 0);
/*!40000 ALTER TABLE `TS_CRON_TASK_CRT` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
