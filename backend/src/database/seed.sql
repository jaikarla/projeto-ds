SET client_encoding TO 'UTF8';
--==============================================================================
-- PREENCHIMENTO DOS PROCEDIMENTOS DA CLÍNICA
-- Dados são pré-definidos e disponibilizados pelo SUS/SIGTAP

-- BPA-I = utilizado para procedimentos que exigem a identificação do paciente
-- BPA-C = utilizado para procedimentos simples que não identificam o paciente 
 
--==============================================================================

INSERT INTO procedimentos (nome, codigo, tipo) VALUES

-- ============================================
-- GRUPO 01 - AÇÕES DE PROMOÇÃO E PREVENÇÃO EM SAÚDE
-- ============================================
('ATIVIDADE EDUCATIVA / ORIENTAÇÃO EM GRUPO NA ATENÇÃO PRIMARIA',         '0101010010', 'BPA-C'),
('ATIVIDADE EDUCATIVA / ORIENTAÇÃO EM GRUPO NA ATENÇÃO ESPECIALIZADA',     '0101010028', 'BPA-C'),
('AÇÃO COLETIVA DE APLICAÇÃO TOPICA DE FLUOR GEL',                        '0101020015', 'BPA-C'),
('AÇÃO COLETIVA DE ESCOVAÇÃO DENTAL SUPERVISIONADA',                       '0101020031', 'BPA-C'),
('AÇÃO COLETIVA DE EXAME BUCAL COM FINALIDADE EPIDEMIOLOGICA',             '0101020040', 'BPA-C'),
('APLICAÇÃO DE CARIOSTATICO (POR DENTE)',                                  '0101020058', 'BPA-C'),
('APLICAÇÃO DE SELANTE (POR DENTE)',                                       '0101020066', 'BPA-C'),
('APLICAÇÃO TÓPICA DE FLÚOR (INDIVIDUAL POR SESSÃO)',                      '0101020074', 'BPA-C'),
('EVIDENCIAÇÃO DE PLACA BACTERIANA',                                       '0101020082', 'BPA-C'),
('SELAMENTO PROVISORIO DE CAVIDADE DENTARIA',                              '0101020090', 'BPA-C'),
('ORIENTAÇÃO DE HIGIENE BUCAL',                                            '0101020104', 'BPA-I'), 
('ORIENTAÇÃO DE HIGIENIZAÇÃO DE PROTESES DENTARIAS',                       '0101020120', 'BPA-I'),
 
-- ============================================================
-- GRUPO 02 - DIAGNÓSTICO E PROCEDIMENTOS ESPECIAIS
-- ============================================================
('BIOPSIA DOS TECIDOS MOLES DA BOCA',                                      '0201010526', 'BPA-I'), 
('RADIOGRAFIA PANORAMICA',                                                 '0204010179', 'BPA-C'), 
('RADIOGRAFIA INTERPROXIMAL (BITE WING)',                                  '0204010217', 'BPA-I'),
('RADIOGRAFIA PERIAPICAL',                                                 '0204010225', 'BPA-I'), 
 
-- ============================================================
-- GRUPO 03 - CONSULTAS E ATENDIMENTOS
-- ============================================================
('CONSULTA DE PROFISSIONAIS DE NIVEL SUPERIOR NA ATENÇÃO PRIMARIA (EXCETO MEDICO)',        '0301010030', 'BPA-C'),
('CONSULTA DE PROFISSIONAIS DE NIVEL SUPERIOR NA ATENÇÃO ESPECIALIZADA (EXCETO MEDICO)',   '0301010048', 'BPA-C'),
('CONSULTA/ATENDIMENTO DOMICILIAR',                                        '0301010137', 'BPA-C'),
('PRIMEIRA CONSULTA ODONTOLOGICA PROGRAMATICA',                            '0301010153', 'BPA-C'),
('ATENDIMENTO DE URGENCIA EM ATENÇÃO BASICA',                              '0301060037', 'BPA-C'),
('ATENDIMENTO DE URGENCIA EM ATENÇÃO ESPECIALIZADA',                       '0301060061', 'BPA-C'),
('AVALIAÇÃO MULTIDIMENSIONAL DA PESSOA IDOSA',                             '0301090033', 'BPA-I'), 
('AFERIÇÃO DE PRESSÃO ARTERIAL',                                           '0301100039', 'BPA-C'),
('RETIRADA DE PONTOS DE CIRURGIAS (POR PACIENTE)',                         '0301100152', 'BPA-C'),
 
-- ============================================================
-- GRUPO 04 - PROCEDIMENTOS CLÍNICOS ODONTOLÓGICOS
-- ============================================================
('CAPEAMENTO PULPAR',                                                      '0307010015', 'BPA-C'),
('RESTAURAÇÃO DE DENTE PERMANENTE ANTERIOR COM RESINA COMPOSTA',          '0307010031', 'BPA-I'), 
('TRATAMENTO DE NEVRALGIAS FACIAIS',                                       '0307010058', 'BPA-C'),
('TRATAMENTO RESTAURADOR ATRAUMATICO (TRA/ART)',                           '0307010074', 'BPA-I'), 
('RESTAURAÇÃO DE DENTE DECIDUO POSTERIOR COM RESINA COMPOSTA',            '0307010082', 'BPA-I'), 
('RESTAURAÇÃO DE DENTE DECIDUO POSTERIOR COM AMALGAMA',                   '0307010090', 'BPA-I'), 
('RESTAURAÇÃO DE DENTE DECIDUO POSTERIOR COM IONOMERO DE VIDRO',          '0307010104', 'BPA-I'), 
('RESTAURAÇÃO DE DENTE DECIDUO ANTERIOR COM RESINA COMPOSTA',             '0307010112', 'BPA-I'), 
('RESTAURAÇÃO DE DENTE PERMANENTE POSTERIOR COM RESINA COMPOSTA',         '0307010120', 'BPA-I'), 
('RESTAURAÇÃO DE DENTE PERMANENTE POSTERIOR COM AMALGAMA',                '0307010139', 'BPA-I'), 
('ADEQUAÇÃO DO COMPORTAMENTO DA PESSOA COM DEFICIENCIA',                   '0307010147', 'BPA-I'),
('ADEQUAÇÃO DO COMPORTAMENTO DE CRIANCAS',                                 '0307010155', 'BPA-I'), 
 
-- ENDODONTIA
('ACESSO A POLPA DENTARIA E MEDICAÇÃO (POR DENTE)',                        '0307020010', 'BPA-C'),
('CURATIVO DE DEMORA C/ OU S/ PREPARO BIOMECANICO',                       '0307020029', 'BPA-C'),
('TRATAMENTO ENDODONTICO DE DENTE DECIDUO',                                '0307020037', 'BPA-C'),
('TRATAMENTO ENDODONTICO DE DENTE PERMANENTE BIRRADICULAR',                '0307020045', 'BPA-C'),
('TRATAMENTO ENDODONTICO DE DENTE PERMANENTE COM TRES OU MAIS RAIZES',    '0307020053', 'BPA-C'),
('TRATAMENTO ENDODONTICO DE DENTE PERMANENTE UNIRRADICULAR',               '0307020061', 'BPA-C'),
('PULPOTOMIA DENTARIA',                                                    '0307020070', 'BPA-C'),
('RETRATAMENTO ENDODONTICO EM DENTE PERMANENTE BI-RADICULAR',              '0307020088', 'BPA-C'),
('RETRATAMENTO ENDODONTICO EM DENTE PERMANENTE COM 3 OU MAIS RAIZES',     '0307020096', 'BPA-C'),
('RETRATAMENTO ENDODONTICO EM DENTE PERMANENTE UNI-RADICULAR',             '0307020100', 'BPA-C'),
('SELAMENTO DE PERFURAÇÃO RADICULAR',                                      '0307020118', 'BPA-C'),
 
-- PERIODONTIA
('RASPAGEM ALISAMENTO SUBGENGIVAIS (POR SEXTANTE)',                        '0307030024', 'BPA-C'),
('RASPAGEM CORONO-RADICULAR (POR SEXTANTE)',                               '0307030032', 'BPA-C'),
('PROFILAXIA / REMOCAO DA PLACA BACTERIANA',                               '0307030040', 'BPA-C'),
('RASPAGEM ALISAMENTO E POLIMENTO SUPRAGENGIVAIS (POR SEXTANTE)',          '0307030059', 'BPA-C'),
('TRATAMENTO DE LESOES DA MUCOSA ORAL',                                    '0307030075', 'BPA-I'),
 
-- PRÓTESE
('MOLDAGEM DENTO-GENGIVAL P/ CONSTRUCAO DE PROTESE DENTARIA',             '0307040070', 'BPA-C'),
('REEMBASAMENTO E CONSERTO DE PROTESE DENTARIA',                           '0307040089', 'BPA-C'),
('ADAPTAÇÃO DE PROTESE DENTARIA',                                          '0307040143', 'BPA-C'),
('AJUSTE OCLUSAL',                                                         '0307040151', 'BPA-C'),
('INSTALAÇÃO DE PROTESE DENTARIA',                                         '0307040160', 'BPA-C'),
 
-- OUTROS PROCEDIMENTOS
('SESSAO DE IMPOSICAO DE MAOS',                                            '0309050162', 'BPA-I'),
 
-- ============================================================
-- GRUPO 05 - PROCEDIMENTOS CIRÚRGICOS
-- ============================================================
('DRENAGEM DE ABSCESSO',                                                   '0401010031', 'BPA-C'),
('EXCISAO E/OU SUTURA SIMPLES DE PEQUENAS LESOES / FERIMENTOS DE PELE / ANEXOS E MUCOSA', '0401010066', 'BPA-C'),
('FRENECTOMIA/FRENOTOMIA',                                                 '0401010082', 'BPA-C'),
('DRENAGEM DE ABSCESSO DA BOCA E ANEXOS',                                  '0404020054', 'BPA-I'),
('EXCISAO E SUTURA DE LESAO NA BOCA',                                      '0404020097', 'BPA-I'),
('CONTENCAO DE DENTES POR SPLINTAGEM',                                     '0404020445', 'BPA-C'),
('OSTEOTOMIA DAS FRATURAS ALVEOLO-DENTARIAS',                              '0404020488', 'BPA-C'),
('REDUCAO DE LUXAÇÃO TEMPORO-MANDIBULAR',                                  '0404020615', 'BPA-C'),
('RETIRADA DE MATERIAL DE SINTESE OSSEA / DENTARIA',                       '0404020623', 'BPA-C'),
 
-- ============================================================
-- GRUPO 06 - CIRURGIAS PERIODONTAIS E DENTOALVEOLARES
-- ============================================================
('APROFUNDAMENTO DE VESTIBULO ORAL (POR SEXTANTE)',                        '0414020030', 'BPA-C'),
('CORREÇÃO DE BRIDAS MUSCULARES',                                          '0414020049', 'BPA-C'),
('CORREÇÃO DE IRREGULARIDADES DE REBORDO ALVEOLAR',                        '0414020057', 'BPA-C'),
('CORREÇÃO DE TUBEROSIDADE DO MAXILAR',                                    '0414020065', 'BPA-C'),
('CURETAGEM PERIAPICAL',                                                   '0414020073', 'BPA-C'),
('ENXERTO GENGIVAL',                                                       '0414020081', 'BPA-C'),
('ENXERTO OSSEO DE AREA DOADORA INTRABUCAL',                               '0414020090', 'BPA-C'),
('EXODONTIA DE DENTE DECIDUO',                                             '0414020120', 'BPA-C'),
('EXODONTIA DE DENTE PERMANENTE',                                          '0414020138', 'BPA-C'),
('EXODONTIA MULTIPLA COM ALVEOLOPLASTIA POR SEXTANTE',                     '0414020146', 'BPA-C'),
('GENGIVECTOMIA (POR SEXTANTE)',                                            '0414020154', 'BPA-C'),
('GENGIVOPLASTIA (POR SEXTANTE)',                                           '0414020162', 'BPA-C'),
('GLOSSORRAFIA',                                                            '0414020170', 'BPA-C'),
('MARSUPIALIZAÇÃO DE CISTOS E PSEUDOCISTOS',                               '0414020200', 'BPA-C'),
('ODONTOSECCAO / RADILECTOMIA / TUNELIZAÇÃO',                              '0414020219', 'BPA-C'),
('REIMPLANTE E TRANSPLANTE DENTAL (POR ELEMENTO)',                          '0414020243', 'BPA-C'),
('REMOCAO DE DENTE RETIDO (INCLUSO / IMPACTADO)',                          '0414020278', 'BPA-C'),
('REMOCAO DE TORUS E EXOSTOSES',                                           '0414020294', 'BPA-C'),
('TRATAMENTO CIRURGICO DE HEMORRAGIA BUCO-DENTAL',                         '0414020359', 'BPA-C'),
('TRATAMENTO CIRURGICO PERIODONTAL (POR SEXTANTE)',                        '0414020375', 'BPA-C'),
('TRATAMENTO DE ALVEOLITE',                                                '0414020383', 'BPA-C'),
('ULOTOMIA/ULECTOMIA',                                                     '0414020405', 'BPA-C'),
 
-- ============================================================
-- GRUPO 07 - ÓRTESES, PRÓTESES E MATERIAIS ESPECIAIS
-- ============================================================
('PROTESE PARCIAL MANDIBULAR REMOVIVEL',                                   '0701070099', 'BPA-I'),
('PROTESE PARCIAL MAXILAR REMOVIVEL',                                      '0701070102', 'BPA-I'),
('PROTESE TOTAL MANDIBULAR',                                               '0701070129', 'BPA-I'),
('PROTESE TOTAL MAXILAR',                                                  '0701070137', 'BPA-I');