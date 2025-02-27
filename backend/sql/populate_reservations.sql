
-- Reserva 1: Usuário 1 para o espaço "Small Meeting Room" (ID: '123e4567-e89b-12d3-a456-426614174000')
INSERT INTO RESERVATIONS (USER_NAME, USER_EMAIL, SPACE_ID, RESERVE_DATE)
VALUES ('Ana Souza', 'ana.souza@email.com', '123e4567-e89b-12d3-a456-426614174000', '2025-03-01 10:00:00');

-- Reserva 2: Usuário 2 para o mesmo espaço "Small Meeting Room" (ID: '123e4567-e89b-12d3-a456-426614174000')
INSERT INTO RESERVATIONS (USER_NAME, USER_EMAIL, SPACE_ID, RESERVE_DATE)
VALUES ('Carlos Silva', 'carlos.silva@email.com', '123e4567-e89b-12d3-a456-426614174000', '2025-03-01 14:00:00');

-- Reserva 3: Usuário 3 para o espaço "Grand Auditorium" (ID: '123e4567-e89b-12d3-a456-426614174001')
INSERT INTO RESERVATIONS (USER_NAME, USER_EMAIL, SPACE_ID, RESERVE_DATE)
VALUES ('Maria Oliveira', 'maria.oliveira@email.com', '123e4567-e89b-12d3-a456-426614174001', '2025-03-05 09:00:00');

-- Reserva 4: Usuário 4 para o espaço "Social Event Space" (ID: '123e4567-e89b-12d3-a456-426614174004')
INSERT INTO RESERVATIONS (USER_NAME, USER_EMAIL, SPACE_ID, RESERVE_DATE)
VALUES ('João Pereira', 'joao.pereira@email.com', '123e4567-e89b-12d3-a456-426614174004', '2025-03-10 11:00:00');