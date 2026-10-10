-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema streamers
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema streamers
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `streamers` DEFAULT CHARACTER SET utf8 ;
USE `streamers` ;

-- -----------------------------------------------------
-- Table `streamers`.`language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streamers`.`language` (
  `idlanguage` INT NOT NULL,
  `name_language` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idlanguage`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `streamers`.`game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streamers`.`game` (
  `idgame` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idgame`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `streamers`.`streamer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streamers`.`streamer` (
  `name` VARCHAR(45) NOT NULL,
  `total_views` INT NULL,
  `total_followers` INT NULL,
  `language_idlanguage` INT NOT NULL,
  `game_1` INT NOT NULL,
  `game_2` INT NOT NULL,
  PRIMARY KEY (`name`),
  INDEX `fk_streamer_language1_idx` (`language_idlanguage` ASC) VISIBLE,
  INDEX `fk_streamer_game1_idx` (`game_1` ASC) VISIBLE,
  INDEX `fk_streamer_game2_idx` (`game_2` ASC) VISIBLE,
  CONSTRAINT `fk_streamer_language1`
    FOREIGN KEY (`language_idlanguage`)
    REFERENCES `streamers`.`language` (`idlanguage`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_streamer_game1`
    FOREIGN KEY (`game_1`)
    REFERENCES `streamers`.`game` (`idgame`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_streamer_game2`
    FOREIGN KEY (`game_2`)
    REFERENCES `streamers`.`game` (`idgame`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `streamers`.`stream`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `streamers`.`stream` (
  `idstream` INT NOT NULL,
  `active_days_per_week` INT NULL,
  `avg_viewers_per_stream` INT NULL,
  `streamer_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idstream`),
  INDEX `fk_stream_streamer1_idx` (`streamer_name` ASC) VISIBLE,
  CONSTRAINT `fk_stream_streamer1`
    FOREIGN KEY (`streamer_name`)
    REFERENCES `streamers`.`streamer` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
