--USERS contrainte role = 'admin', 'organizer', 'client', 'assistant'
insert into core.users (full_name, email, role, phone, created_at) values ('Marice Stiddard', 'mstiddard0@acquirethisname.com', 'client', '837-861-5728', '2025-04-28');
insert into core.users (full_name, email, role, phone, created_at) values ('Lenette Ovington', 'lovington1@live.com', 'admin', '497-657-3979', '2025-03-18');
insert into core.users (full_name, email, role, phone, created_at) values ('Ingaberg Blazejewski', 'iblazejewski2@dailymotion.com', 'organizer', '168-883-9587', '2025-03-09');
insert into core.users (full_name, email, role, phone, created_at) values ('Alanson Pipping', 'apipping3@netlog.com', 'client', '386-380-1044', '2025-03-11');
insert into core.users (full_name, email, role, phone, created_at) values ('Sapphire Kamienski', 'skamienski4@cnn.com', 'assistant', '466-764-2728', '2025-12-23');
insert into core.users (full_name, email, role, phone, created_at) values ('Josias Vedishchev', 'jvedishchev5@vk.com', 'assistant', '332-735-3498', '2026-06-01');
insert into core.users (full_name, email, role, phone, created_at) values ('Cyndy Driffield', 'cdriffield6@ebay.co.uk', 'organizer', '521-922-2496', '2025-09-29');
insert into core.users (full_name, email, role, phone, created_at) values ('Dale Lempenny', 'dlempenny7@nsw.gov.au', 'client', '135-760-0754', '2025-07-14');

--PROVIDERS contrainte service_type = 'caterer', 'photographer', 'videographer', 'dj', 'florist', 'decorator', 'baker', 'transport', 'security', 'mc_host', 'wedding_planner', 'venue_manager', 'other'
INSERT INTO core.providers
(company_name, service_type, email, phone, level, region)
VALUES
('Elegant Feast Catering', 'caterer', 'contact@elegantfeast.mg', '+261341234567', 4, 'Antananarivo'),
('Golden Lens Studio', 'photographer', 'hello@goldenlens.mg', '+261331112233', 3, 'Antananarivo'),
('SkyFrame Productions', 'videographer', 'team@skyframe.mg', '+261321234567', 3, 'Toamasina'),
('Crystal Beat DJ', 'dj', 'booking@crystalbeat.mg', '+261341998877', 2, 'Antananarivo'),
('Floral Paradise', 'florist', 'contact@floralparadise.mg', '+261331223344', 5, 'Antsirabe'),
('Dream Event Decor', 'decorator', 'info@dreameventdecor.mg', '+261321112233', 4, 'Antananarivo'),
('Sweet Bliss Bakery', 'baker', 'orders@sweetbliss.mg', '+261341556677', 3, 'Antsirabe'),
('Royal Wedding Cars', 'transport', 'support@royalweddingcars.mg', '+261331998877', 2, 'Antananarivo'),
('Diamond Event Security', 'security', 'admin@diamondsecurity.mg', '+261321334455', 4, 'Mahajanga'),
('Prestige MC Services', 'mc_host', 'contact@prestigemc.mg', '+261341223344', 3, 'Antananarivo'),
('Forever Wedding Planning', 'wedding_planner', 'team@foreverwedding.mg', '+261331445566', 5, 'Antananarivo'),
('Sunset Garden Venue', 'venue_manager', 'info@sunsetgarden.mg', '+261321556677', 4, 'Nosy Be'),
('OceanView Events', 'venue_manager', 'contact@oceanviewevents.mg', '+261341667788', 3, 'Toamasina'),
('Happy Moments Planner', 'wedding_planner', 'hello@happymoments.mg', '+261331778899', 2, 'Antsirabe'),
('Magic Light Decorations', 'decorator', 'info@magiclightdecor.mg', '+261321998877', 3, 'Fianarantsoa'),
('StarShot Photography', 'photographer', 'contact@starshot.mg', '+261341889900', 4, 'Mahajanga'),
('CinemaLove Films', 'videographer', 'team@cinemalove.mg', '+261331223355', 5, 'Antananarivo'),
('PartyWave DJ', 'dj', 'booking@partywave.mg', '+261321443322', 2, 'Toamasina'),
('Garden Bloom Florist', 'florist', 'contact@gardenbloom.mg', '+261341776655', 4, 'Antsirabe'),
('Elite Event Services', 'other', 'info@eliteeventservices.mg', '+261331112244', 3, 'Antananarivo');


-- UUID client =>
-- f3b792ae-3505-4609-a30e-d87d565dd61b Dale Lempenny
-- 901f5071-0804-49f7-8075-1f865c7a9855 Marice Stiddard
-- 0776527e-98b3-494b-bc5f-197bce13d868 Alanson Pipping
-- 4a884773-8423-49cc-9f46-75e0502bdf5c Mokback

INSERT INTO core.events
(created_by, title, event_date, location, guests_count, status, updated_at)
VALUES
('f3b792ae-3505-4609-a30e-d87d565dd61b', 'Mariage de Sophie et Dale', '2026-07-12', 'Antananarivo', 120, 'planning', NULL),
('4a884773-8423-49cc-9f46-75e0502bdf5c', 'Mariage de Clara et Mokback', '2026-09-18', 'Toamasina', 180, 'planning', NULL);

-- UUID event =>
-- de7b09d8-2ddf-4146-9b50-00b33bd0e358 Sophie et Dale
-- 33dbbe8d-df30-44a3-80b1-d2b69a76ddbd Clara et Mokback

INSERT INTO timeline.timeline_phases
(event_id, name, description, start_date, end_date, phase_order)
VALUES
('de7b09d8-2ddf-4146-9b50-00b33bd0e358', 'Préparatifs', 'Recherche et réservation', '2026-02-15', '2026-04-30', 1),
('de7b09d8-2ddf-4146-9b50-00b33bd0e358', 'Confirmation', 'Prestataires confirmés', '2026-05-01', '2026-07-30', 2),
('de7b09d8-2ddf-4146-9b50-00b33bd0e358', 'Organisation finale', 'Coordination finale avec tous les prestataires', '2026-08-01', '2026-09-15', 3),
('de7b09d8-2ddf-4146-9b50-00b33bd0e358', 'Événement', 'Déroulement de la cérémonie et de la réception', '2026-09-20', '2026-09-20', 4),
('de7b09d8-2ddf-4146-9b50-00b33bd0e358', 'Clôture', 'Remerciements et règlement final des prestataires', '2026-09-21', '2026-10-05', 5);

