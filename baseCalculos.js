// =====================================================
// CALCULOBRA | TECTONICO
// baseCalculos.js
// MAMPOSTERÍA + REVOQUES
// =====================================================

const baseCalculos = [

    // =====================================================
    // MAMPOSTERÍAS
    // =====================================================

    {
        id: "tabique_de_canto_ladrillo_comun_24x11x5cm_junta_1_5cm",
        categoria: "mamposterias",
        nombre: "Tabique de canto - ladrillo común (24x11x5cm) - junta 1,5cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 2,
                unidad: "kg",
                resultadoPorUnidad: 0.08,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 2.1,
                unidad: "kg",
                resultadoPorUnidad: 0.084,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.01,
                unidad: "m3",
                resultadoPorUnidad: 0.01,
                unidadCompra: "m3"
            },
            {
                nombre: "ladrillo comun",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 30,
                unidad: "unidades",
                resultadoPorUnidad: 30,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "pared_de_ladrillo_comun_portante_espesor_12cm",
        categoria: "mamposterias",
        nombre: "Pared de ladrillo común portante - espesor 12cm - junta 1,5cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 8.4,
                unidad: "kg",
                resultadoPorUnidad: 0.336,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 3.7,
                unidad: "kg",
                resultadoPorUnidad: 0.148,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.037,
                unidad: "m3",
                resultadoPorUnidad: 0.037,
                unidadCompra: "m3"
            },
            {
                nombre: "ladrillo comun",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 60,
                unidad: "unidades",
                resultadoPorUnidad: 60,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "pared_de_ladrillo_comun_portante_espesor_30cm",
        categoria: "mamposterias",
        nombre: "Pared de ladrillo común portante - espesor 30cm - junta 1,5cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 19.1,
                unidad: "kg",
                resultadoPorUnidad: 0.764,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 9.9,
                unidad: "kg",
                resultadoPorUnidad: 0.396,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.09,
                unidad: "m3",
                resultadoPorUnidad: 0.09,
                unidadCompra: "m3"
            },
            {
                nombre: "ladrillos",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 120,
                unidad: "unidades",
                resultadoPorUnidad: 120,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "pared_de_ladrillo_ceramico_portante_18x19x33",
        categoria: "mamposterias",
        nombre: "Pared de ladrillo cerámico portante 18x19x33 - junta 1,5cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 5.7,
                unidad: "kg",
                resultadoPorUnidad: 0.228,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 2.5,
                unidad: "kg",
                resultadoPorUnidad: 0.1,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.025,
                unidad: "m3",
                resultadoPorUnidad: 0.025,
                unidadCompra: "m3"
            },
            {
                nombre: "ladrillos",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 16,
                unidad: "unidades",
                resultadoPorUnidad: 16,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "pared_de_ladrillo_ceramico_portante_12x19x33",
        categoria: "mamposterias",
        nombre: "Pared de ladrillo cerámico portante 12x19x33 - junta 1,5cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 4,
                unidad: "kg",
                resultadoPorUnidad: 0.16,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 1.8,
                unidad: "kg",
                resultadoPorUnidad: 0.072,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.018,
                unidad: "m3",
                resultadoPorUnidad: 0.018,
                unidadCompra: "m3"
            },
            {
                nombre: "ladrillos",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 16,
                unidad: "unidades",
                resultadoPorUnidad: 16,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "tabique_ceramico_no_portante_10cm",
        categoria: "mamposterias",
        nombre: "Tabique cerámico no portante 10cm - 8x18x33",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 2.5,
                unidad: "kg",
                resultadoPorUnidad: 0.1,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 2.6,
                unidad: "kg",
                resultadoPorUnidad: 0.104,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.012,
                unidad: "m3",
                resultadoPorUnidad: 0.012,
                unidadCompra: "m3"
            },
            {
                nombre: "ladrillos",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 16,
                unidad: "unidades",
                resultadoPorUnidad: 16,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "tabique_ceramico_no_portante_20cm",
        categoria: "mamposterias",
        nombre: "Tabique cerámico no portante 20cm - 8x18x33",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 7.8,
                unidad: "kg",
                resultadoPorUnidad: 0.312,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 8,
                unidad: "kg",
                resultadoPorUnidad: 0.32,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.037,
                unidad: "m3",
                resultadoPorUnidad: 0.037,
                unidadCompra: "m3"
            },
            {
                nombre: "ladrillos",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 33,
                unidad: "unidades",
                resultadoPorUnidad: 33,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "bloque_de_hormigon_20cm",
        categoria: "mamposterias",
        nombre: "Bloque de hormigón 20cm - 19x19x39 - junta 1cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 1.5,
                unidad: "kg",
                resultadoPorUnidad: 0.06,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 3.3,
                unidad: "kg",
                resultadoPorUnidad: 0.132,
                unidadCompra: "bolsa de 25 kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.015,
                unidad: "m3",
                resultadoPorUnidad: 0.015,
                unidadCompra: "m3"
            },
            {
                nombre: "bloque",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 13,
                unidad: "unidades",
                resultadoPorUnidad: 13,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "retak_portante_20cm",
        categoria: "mamposterias",
        nombre: "Retak portante 20cm - 20x25x50 - junta de 2mm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cemento tector",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 4.7,
                unidad: "kg",
                resultadoPorUnidad: 0.188,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "ladrillo de 20x25x50",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 8,
                unidad: "unidades",
                resultadoPorUnidad: 8,
                unidadCompra: "unidades"
            }
        ]
    },

    {
        id: "retak_10cm",
        categoria: "mamposterias",
        nombre: "Retak 10cm - 10x25x50 - junta de 2mm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cemento tector",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 3.5,
                unidad: "kg",
                resultadoPorUnidad: 0.14,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "ladrillo de 10x25x50",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 8,
                unidad: "unidades",
                resultadoPorUnidad: 8,
                unidadCompra: "unidades"
            }
        ]
    },

    // =====================================================
    // REVOQUES Y MORTEROS DE PARED
    // =====================================================

    {
        id: "azotado_hidrofugo_1cm",
        categoria: "revoques",
        tipoRevoque: "azotado_hidrofugo",
        nombre: "Azotado hidrófugo - espesor 1 cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 5.4,
                unidad: "kg",
                resultadoPorUnidad: 0.216,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.012,
                unidad: "m3",
                resultadoPorUnidad: 0.012,
                unidadCompra: "m3"
            },
            {
                nombre: "hidrofugo",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.25,
                unidad: "litros",
                resultadoPorUnidad: 0.05,
                unidadCompra: "sachet de 5 litros"
            }
        ]
    },

    {
        id: "revoque_grueso_1_5cm",
        categoria: "revoques",
        tipoRevoque: "revoque_grueso",
        nombre: "Revoque grueso - espesor 1,5 cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 3.6,
                unidad: "kg",
                resultadoPorUnidad: 0.144,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 1.85,
                unidad: "kg",
                resultadoPorUnidad: 0.074,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.017,
                unidad: "m3",
                resultadoPorUnidad: 0.017,
                unidadCompra: "m3"
            }
        ]
    },

    {
        id: "revoque_grueso_cemento_albanileria_1cm",
        categoria: "revoques",
        tipoRevoque: "revoque_grueso",
        nombre: "Revoque grueso con cemento albañilería - espesor 1 cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cemento albañileria",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 3.8,
                unidad: "kg",
                resultadoPorUnidad: 0.152,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.02,
                unidad: "m3",
                resultadoPorUnidad: 0.02,
                unidadCompra: "m3"
            }
        ]
    },

    {
        id: "revoque_fino_1_2cm",
        categoria: "revoques",
        tipoRevoque: "revoque_fino",
        nombre: "Revoque fino - espesor 1/2 cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cal",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 1.6,
                unidad: "kg",
                resultadoPorUnidad: 0.064,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.45,
                unidad: "kg",
                resultadoPorUnidad: 0.018,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.006,
                unidad: "m3",
                resultadoPorUnidad: 0.006,
                unidadCompra: "m3"
            }
        ]
    },

      // =====================================================
    // CARPETAS
    // =====================================================

    {
        id: "carpeta_cementicia_2cm",
        categoria: "carpetas",
        nombre: "Carpeta cementicia - espesor 2 cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 10.8,
                unidad: "kg",
                resultadoPorUnidad: 0.432,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.024,
                unidad: "m3",
                resultadoPorUnidad: 0.024,
                unidadCompra: "m3"
            }
        ]
    },

    {
        id: "carpeta_hidrofuga_nivelacion_2cm",
        categoria: "carpetas",
        nombre: "Carpeta hidrófuga o para nivelación - espesor 2 cm",
        unidad: "m2",

        materiales: [
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 10.8,
                unidad: "kg",
                resultadoPorUnidad: 0.432,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.024,
                unidad: "m3",
                resultadoPorUnidad: 0.024,
                unidadCompra: "m3"
            },
            {
                nombre: "hidrofugo",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.5,
                unidad: "litros",
                resultadoPorUnidad: 0.1,
                unidadCompra: "sachet de 5 litros"
            }
        ] 
    },

    // =====================================================
    // HORMIGÓN
    // =====================================================

    {
        id: "hormigon_armado",
        categoria: "hormigon",
        nombre: "Hormigón armado",
        unidad: "m3",

        materiales: [
            {
                nombre: "cemento",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 300,
                unidad: "kg",
                resultadoPorUnidad: 12,
                unidadCompra: "bolsa de 25kg"
            },
            {
                nombre: "arena",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.65,
                unidad: "m3",
                resultadoPorUnidad: 0.65,
                unidadCompra: "m3"
            },
            {
                nombre: "piedra",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0.65,
                unidad: "m3",
                resultadoPorUnidad: 0.65,
                unidadCompra: "m3"
            },
            {
                nombre: "hierro",
                datoEntradaPorUnidad: 1,
                cantidadPorUnidad: 0,
                unidad: "manual",
                resultadoPorUnidad: 0,
                unidadCompra: "cálculo manual"
            }
        ]
    }
    
];
