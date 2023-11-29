-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema movies_ticket_reservation_new
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema movies_ticket_reservation_new
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `movies_ticket_reservation_new` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `movies_ticket_reservation_new` ;

-- -----------------------------------------------------
-- Table `movies_ticket_reservation_new`.`web_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_ticket_reservation_new`.`web_user` (
  `Web_user_ID` VARCHAR(5) NOT NULL,
  `FirstName` VARCHAR(15) NULL DEFAULT NULL,
  `LastName` VARCHAR(20) NULL DEFAULT NULL,
  `Email_ID` VARCHAR(30) NULL DEFAULT NULL,
  `Age` INT NULL DEFAULT NULL,
  `PhoneNumber` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`Web_user_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movies_ticket_reservation_new`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_ticket_reservation_new`.`booking` (
  `Booking_ID` VARCHAR(5) NOT NULL,
  `No_Of_Tickets` INT NOT NULL,
  `Total_cost` INT NOT NULL,
  `CardNumber` VARCHAR(19) NULL DEFAULT NULL,
  `Name_on_card` VARCHAR(21) NULL DEFAULT NULL,
  `User_ID` VARCHAR(5) NULL DEFAULT NULL,
  PRIMARY KEY (`Booking_ID`),
  INDEX `User_ID` (`User_ID` ASC) VISIBLE,
  CONSTRAINT `booking_ibfk_1`
    FOREIGN KEY (`User_ID`)
    REFERENCES `movies_ticket_reservation_new`.`web_user` (`Web_user_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movies_ticket_reservation_new`.`movie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_ticket_reservation_new`.`movie` (
  `Movie_id` VARCHAR(5) NOT NULL,
  `MovieName` VARCHAR(30) NOT NULL,
  `Language` VARCHAR(10) NULL DEFAULT NULL,
  `Genre` VARCHAR(20) NULL DEFAULT NULL,
  `TargetAudience` VARCHAR(5) NULL DEFAULT NULL,
  PRIMARY KEY (`Movie_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movies_ticket_reservation_new`.`theatre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_ticket_reservation_new`.`theatre` (
  `Theatre_id` VARCHAR(5) NOT NULL,
  `Name_of_Theatre` VARCHAR(30) NOT NULL,
  `No_of_Screens` INT NULL DEFAULT NULL,
  `Area` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`Theatre_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movies_ticket_reservation_new`.`screen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_ticket_reservation_new`.`screen` (
  `Screen_id` VARCHAR(5) NOT NULL,
  `No_of_seats_gold` INT NOT NULL,
  `No_of_seats_silver` INT NOT NULL,
  `Theatre_id` VARCHAR(5) NULL DEFAULT NULL,
  PRIMARY KEY (`Screen_id`),
  INDEX `Theatre_id` (`Theatre_id` ASC) VISIBLE,
  CONSTRAINT `screen_ibfk_1`
    FOREIGN KEY (`Theatre_id`)
    REFERENCES `movies_ticket_reservation_new`.`theatre` (`Theatre_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movies_ticket_reservation_new`.`shows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_ticket_reservation_new`.`shows` (
  `Show_Id` VARCHAR(10) NOT NULL,
  `Showtime` TIME NOT NULL,
  `Show_Date` DATE NOT NULL,
  `Seats_remaining_gold` INT NOT NULL,
  `Seats_remaining_silver` INT NOT NULL,
  `Class_cost_gold` INT NOT NULL,
  `Class_cost_silver` INT NOT NULL,
  `Screen_id` VARCHAR(5) NOT NULL,
  `Movie_id` VARCHAR(6) NOT NULL,
  `showscol` VARCHAR(45) NULL,
  `Booking_ID` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`Show_Id`, `Booking_ID`),
  INDEX `Screen_id` (`Screen_id` ASC) VISIBLE,
  INDEX `Movie_id` (`Movie_id` ASC) VISIBLE,
  INDEX `fk_shows_booking1_idx` (`Booking_ID` ASC) VISIBLE,
  CONSTRAINT `shows_ibfk_1`
    FOREIGN KEY (`Screen_id`)
    REFERENCES `movies_ticket_reservation_new`.`screen` (`Screen_id`),
  CONSTRAINT `shows_ibfk_2`
    FOREIGN KEY (`Movie_id`)
    REFERENCES `movies_ticket_reservation_new`.`movie` (`Movie_id`),
  CONSTRAINT `fk_shows_booking1`
    FOREIGN KEY (`Booking_ID`)
    REFERENCES `movies_ticket_reservation_new`.`booking` (`Booking_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `movies_ticket_reservation_new`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `movies_ticket_reservation_new`.`ticket` (
  `Ticket_id` VARCHAR(8) NOT NULL,
  `Booking_ID` VARCHAR(10) NULL DEFAULT NULL,
  `Class` VARCHAR(3) NOT NULL,
  `Price` INT NOT NULL,
  PRIMARY KEY (`Ticket_id`),
  INDEX `Booking_ID` (`Booking_ID` ASC) VISIBLE,
  CONSTRAINT `ticket_ibfk_1`
    FOREIGN KEY (`Booking_ID`)
    REFERENCES `movies_ticket_reservation_new`.`booking` (`Booking_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
