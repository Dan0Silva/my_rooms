
-- Deletando outras tabelas caso existam
DROP TABLE IF EXISTS RESERVATIONS;
DROP TABLE IF EXISTS SPACES;

-- Criação da tabela de espaços
CREATE TABLE SPACES (
    ID CHAR(36) PRIMARY KEY DEFAULT (UUID()),  -- UUID auto gerado
    NAME VARCHAR(255) NOT NULL,
    PHOTO_URL VARCHAR(255),
    DESCRIPTION TEXT,
--     CAPACITY INT NOT NULL,
--    RESERVATIONS_COUNT INT DEFAULT 0,  -- Contador de reservas, valor inicial 0
    LOCATE VARCHAR(255),
    IS_AVAILABLE BOOLEAN NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Utiliza o timestamp atual
) ENGINE = InnoDB;

-- Criação da tabela de reservas
CREATE TABLE RESERVATIONS (
    ID CHAR(36) PRIMARY KEY DEFAULT (UUID()),  -- UUID auto gerado
    USER_NAME VARCHAR(255) NOT NULL,
    USER_EMAIL VARCHAR(255) NOT NULL,
    SPACE_ID CHAR(36),  -- Chave estrangeira para a tabela SPACES
    RESERVE_DATE TIMESTAMP NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp auto gerado
    FOREIGN KEY (SPACE_ID) REFERENCES SPACES(ID) ON DELETE CASCADE  -- Relacionamento com a tabela SPACES
) ENGINE = InnoDB;

