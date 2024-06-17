-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2024 at 10:56 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employeecasheworg`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(150) NOT NULL,
  `name` varchar(30) NOT NULL,
  `image` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `name`, `image`) VALUES
(1, 'admin@gmail.com', '12345', 'Nikhil Pandit', 'image_1715666638973.png');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'IT'),
(2, 'Web'),
(3, 'Design'),
(4, 'System');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(150) NOT NULL,
  `salary` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `image` varchar(60) NOT NULL,
  `bankname` varchar(30) NOT NULL,
  `account_no` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `password`, `salary`, `address`, `image`, `bankname`, `account_no`) VALUES
(26, 'Gouri', 'gouri12@gmail.com', '$2b$10$CNvFjgiFTpdEGcpDQyBuWOj1hlgiQYlvpyHM7INXzGjbDShvJizQO', 20000, 'Vidyanagar , Hubli', 'image_1716900872202.jpg', 'Canara Bank', '040029376262'),
(27, 'Vedavati', 'veda@gmail.com', '$2b$10$bXtryvD4Rj8o9awTdneNW.xaZI0xKsNR62ofMD6vIj0ElHkjUt7Eu', 12000, 'Vidyanagar , Hubli', 'image_1716900923794.jpg', 'Canara Bank', '040044139837'),
(28, 'Malini', 'malini@gmail.com', '$2b$10$81NmJzBaA3mYJt3y2HJ6JOhxnY5dVexFEk.j9gjz8NzhlRdRAzARm', 30000, '1234 Main st', 'image_1716900963534.jpg', 'Canara Bank', '040030054924'),
(29, 'Vasant', 'vasant@gmail.com', '$2b$10$z16I8idJapVI6yXDkGb2YeSjANtw9I9SXbXYXz16oUQnw6zncNV2G', 20000, 'Kumta, Uttara Kannada', 'image_1716900996492.png', 'Canara Bank', '040095165228'),
(30, 'Lata', 'lata@gmail.com', '$2b$10$i1gXZOjwv8k0JorKJiR26e0H6ghqMFSgrNPSnmmbB9dTPNfgHA4Hi', 15000, '1234 Main st', 'image_1716901127971.jpg', 'Canara Bank', '040044390641'),
(31, 'Lalita', 'lalita@gmail.com', '$2b$10$z7To4sbHBHLOT0oZyvrBnug2tjMevJMoO82B5maPWNy7oFV/poeZy', 24000, 'Vidyanagar , Hubli', 'image_1716901163366.jpg', 'Canara Bank', '040096431870'),
(32, 'Parwati', 'parwati@gmail.com', '$2b$10$Q1/QO80ftE64NH2Qr.YP9u/QoMB3nhKi/z/hlCpl6vDY6tkjnuc2K', 18000, 'Hubli, 580021', 'image_1716901204827.jpg', 'Canara Bank', '040063212623'),
(33, 'Renuka', 'renuka@gmail.com', '$2b$10$cmXxFV5yYWL0zxeYUNouK.pyut7VYpsF/u8cb3SJ9RgofwFlXxRlq', 21000, 'Vidyanagar , Hubli', 'image_1716901235100.jpg', 'Canara Bank', '040095637318'),
(34, 'Aditya Nellikeri', 'admin@gmail.com', '$2b$10$AHj7D5ufE8pKFz5D7W.nA.gXmRFM5kk9Y1Q55vwofeXHpgFEOhHLy', 12200, 'Mantur Mansion, 3rd floor,D3. Near BVB backgate, O', 'image_1717164767003.png', 'canara bank', '040027525263');

-- --------------------------------------------------------

--
-- Table structure for table `employee_attendance`
--

CREATE TABLE `employee_attendance` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `attendance_date` date NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_wages`
--

CREATE TABLE `employee_wages` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `work_date` date NOT NULL,
  `weight` int(11) NOT NULL,
  `wage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_wages`
--

INSERT INTO `employee_wages` (`id`, `employee_id`, `work_date`, `weight`, `wage`) VALUES
(50, 26, '2024-05-28', 23, 421),
(51, 27, '2024-05-28', 23, 412),
(52, 28, '2024-05-28', 19, 348),
(53, 29, '2024-05-28', 25, 458),
(54, 30, '2024-05-28', 28, 503),
(55, 31, '2024-05-28', 21, 384),
(56, 32, '2024-05-28', 24, 439),
(57, 33, '2024-05-28', 24, 430),
(58, 26, '2024-05-29', 22, 370),
(59, 27, '2024-05-29', 19, 311),
(60, 28, '2024-05-29', 22, 361),
(61, 29, '2024-05-29', 26, 437),
(62, 30, '2024-05-29', 28, 470),
(63, 31, '2024-05-29', 20, 328),
(64, 32, '2024-05-29', 24, 403),
(65, 33, '2024-05-29', 27, 454),
(66, 26, '2024-05-30', 23, 386),
(67, 27, '2024-05-30', 20, 328),
(68, 28, '2024-05-30', 22, 361),
(69, 29, '2024-05-30', 25, 420),
(70, 30, '2024-05-30', 27, 454),
(71, 31, '2024-05-30', 20, 328),
(72, 32, '2024-05-30', 25, 412),
(73, 33, '2024-05-30', 23, 386),
(74, 26, '2024-05-31', 3, 37),
(75, 27, '2024-05-31', 4, 49),
(76, 28, '2024-05-31', 5, 61),
(77, 29, '2024-05-31', 6, 73),
(78, 30, '2024-05-31', 7, 85),
(79, 31, '2024-05-31', 8, 98),
(80, 32, '2024-05-31', 9, 110),
(81, 33, '2024-05-31', 10, 122),
(82, 34, '2024-05-31', 11, 134);

-- --------------------------------------------------------

--
-- Table structure for table `grading`
--

CREATE TABLE `grading` (
  `id` int(11) NOT NULL,
  `W180` int(11) NOT NULL,
  `W210` int(11) NOT NULL,
  `W240` int(11) NOT NULL,
  `W280` int(11) NOT NULL,
  `W320` int(11) NOT NULL,
  `W400` int(11) NOT NULL,
  `JH` int(11) NOT NULL,
  `JK` int(11) NOT NULL,
  `K` int(11) NOT NULL,
  `SWP` int(11) NOT NULL,
  `LWP` int(11) NOT NULL,
  `BB` int(11) NOT NULL,
  `grade_date` date NOT NULL,
  `sum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grading`
--

INSERT INTO `grading` (`id`, `W180`, `W210`, `W240`, `W280`, `W320`, `W400`, `JH`, `JK`, `K`, `SWP`, `LWP`, `BB`, `grade_date`, `sum`) VALUES
(2, 20, 35, 30, 28, 34, 40, 27, 16, 34, 38, 28, 24, '2024-05-29', 354),
(3, 19, 31, 28, 28, 34, 36, 27, 16, 24, 28, 22, 24, '2024-04-29', 317);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee_wages`
--
ALTER TABLE `employee_wages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `grading`
--
ALTER TABLE `grading`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `employee_wages`
--
ALTER TABLE `employee_wages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `grading`
--
ALTER TABLE `grading`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  ADD CONSTRAINT `employee_attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `employee_wages`
--
ALTER TABLE `employee_wages`
  ADD CONSTRAINT `employee_wages_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
