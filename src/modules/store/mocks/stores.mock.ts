import { IStore } from "../models/IStore";

export const STORES_MOCK: IStore[] = [
    {
        id: "casa-borda",
        name: "Casa Borda",
        description: "Líderes en materiales de construcción en la región. Amplio stock de materiales en seco y en húmedo para tu obra grande o pequeña.",
        address: "Av. San Martín 1542, Centro",
        phone: "+54 9 11 1234-5678",
        email: "ventas@casaborda.com.ar",
        logo: "/casa_borda_logo.png",
        banner: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop",
        socialMedia: {
            facebook: "casaborda",
            instagram: "casaborda.arg",
            twitter: "",
            linkedin: ""
        },
        paymentMethods: ["Efectivo", "Transferencia", "Tarjetas de crédito", "MercadoPago"],
        shippingMethods: ["Retiro en sucursal", "Envío a domicilio (CABA y GBA)", "Flete a coordinar"],
        isOpen: true,
        openingHours: {
            monday: "08:00 - 18:00",
            tuesday: "08:00 - 18:00",
            wednesday: "08:00 - 18:00",
            thursday: "08:00 - 18:00",
            friday: "08:00 - 18:00",
            saturday: "08:00 - 13:00",
            sunday: "Cerrado"
        }
    },
    {
        id: "corralon-san-martin",
        name: "Corralón San Martín",
        description: "Todo para la construcción. Especialistas en áridos, cementos, hierro y herramientas para la construcción civil e industrial. Atendemos a constructores y particulares.",
        address: "Ruta 8 Km 45.5, Pilar",
        phone: "+54 9 11 8765-4321",
        email: "consultas@corralonsanmartin.com",
        logo: "https://ui-avatars.com/api/?name=Corralon+San+Martin&background=0D8ABC&color=fff&size=128",
        banner: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2671&auto=format&fit=crop",
        socialMedia: {
            facebook: "CorralonSM",
            instagram: "corralon_sanmartin",
            twitter: "SanMartinOk",
            linkedin: "corralon-san-martin"
        },
        paymentMethods: ["Efectivo", "Transferencia bancaria", "Cheques a 30 días (solo empresas)", "Tarjetas de débito"],
        shippingMethods: ["Retiro en depósito", "Camión volcador propio", "Envío express en 24hs"],
        isOpen: true,
        openingHours: {
            monday: "07:30 - 17:00",
            tuesday: "07:30 - 17:00",
            wednesday: "07:30 - 17:00",
            thursday: "07:30 - 17:00",
            friday: "07:30 - 17:00",
            saturday: "Cerrado",
            sunday: "Cerrado"
        }
    },
    {
        id: "pintureria-colorama",
        name: "Pinturería Colorama",
        description: "El mayor surtido en pinturas, impermeabilizantes, revestimientos plásticos y accesorios. Asesoramiento técnico especializado para renovar tus ambientes con la mejor calidad.",
        address: "Av. Rivadavia 10500, Liniers",
        phone: "+54 9 11 5555-1234",
        email: "info@colorama.ar",
        logo: "https://ui-avatars.com/api/?name=Pintureria+Colorama&background=F59E0B&color=fff&size=128",
        banner: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop",
        socialMedia: {
            facebook: "ColoramaPinturas",
            instagram: "colorama.tips",
            twitter: "",
            linkedin: ""
        },
        paymentMethods: ["Efectivo", "MercadoPago", "Tarjetas de crédito (Hasta 6 cuotas s/interés)"],
        shippingMethods: ["Retiro por mostrador", "Envío gratis compras mayores a $50.000"],
        isOpen: false,
        openingHours: {
            monday: "09:00 - 19:30",
            tuesday: "09:00 - 19:30",
            wednesday: "09:00 - 19:30",
            thursday: "09:00 - 19:30",
            friday: "09:00 - 19:30",
            saturday: "09:30 - 14:00",
            sunday: "Cerrado"
        }
    },
    {
        id: "ferreteria-el-tornillo",
        name: "Ferretería El Tornillo",
        description: "Ferretería industrial y barrial. Herramientas eléctricas, manuales, bulonería, elementos de protección personal y electricidad. Todo lo que el profesional necesita en un solo lugar.",
        address: "Calle Falsa 123, Morón",
        phone: "+54 9 11 2233-4455",
        email: "ventas@eltornilloferreteria.com.ar",
        logo: "https://ui-avatars.com/api/?name=Ferreteria+El+Tornillo&background=EF4444&color=fff&size=128",
        banner: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2670&auto=format&fit=crop",
        socialMedia: {
            facebook: "FerreteriaTornillo",
            instagram: "el_tornillo_tools",
            twitter: "",
            linkedin: ""
        },
        paymentMethods: ["Efectivo", "Cuenta Corriente", "Transferencia", "QR"],
        shippingMethods: ["Retiro en mostrador", "Despacho por expreso al interior"],
        isOpen: true,
        openingHours: {
            monday: "08:30 - 13:00 / 14:30 - 18:30",
            tuesday: "08:30 - 13:00 / 14:30 - 18:30",
            wednesday: "08:30 - 13:00 / 14:30 - 18:30",
            thursday: "08:30 - 13:00 / 14:30 - 18:30",
            friday: "08:30 - 13:00 / 14:30 - 18:30",
            saturday: "08:30 - 13:00",
            sunday: "Cerrado"
        }
    },
    {
        id: "sanitarios-aguas-claras",
        name: "Sanitarios Aguas Claras",
        description: "Materiales sanitarios, griferías, cañerías, tanques de agua y repuestos multimarca. Soluciones para obras nuevas, refacciones residenciales o instalaciones industriales.",
        address: "Av. Belgrano 2500, CABA",
        phone: "+54 9 11 9988-7766",
        email: "contacto@aguasclaras.com",
        logo: "https://ui-avatars.com/api/?name=Sanitarios+Aguas+Claras&background=3B82F6&color=fff&size=128",
        banner: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2670&auto=format&fit=crop",
        socialMedia: {
            facebook: "aguasclaras.sanitarios",
            instagram: "aguasclaras_griferias",
            twitter: "",
            linkedin: ""
        },
        paymentMethods: ["Efectivo", "Transferencia", "Todo Pago", "Tarjetas de crédito bancarias"],
        shippingMethods: ["Retiro en el local", "Zonales sin cargo", "Envíos a todo el país"],
        isOpen: true,
        openingHours: {
            monday: "08:00 - 17:30",
            tuesday: "08:00 - 17:30",
            wednesday: "08:00 - 17:30",
            thursday: "08:00 - 17:30",
            friday: "08:00 - 17:30",
            saturday: "Cerrado",
            sunday: "Cerrado"
        }
    }
];
