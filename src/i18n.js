import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          reactions: {
            reactions: "Reactions",
            like: "Like",
            love: "Love",
            applause: "Applause",
            laughing: "Laughing",
            wow: "Wow",
            highfive: "High Five!"
          },
          story: {
            upload: "Upload a Story",
            desc: "Stories are visible for 24 hours before they disappear!",
            choose: "Choose image",
            error: "Stories must be image only (no .mp4, .mp3, .mov files)",
            post: "Post"
          },
          categories: {
            all: "All",
            category: "Category",
            general: "General",
            jobs: "Jobs",
            events: "Events",
            news: "News",
            newsArticles: "News and Articles",
            articles: "Articles",
            local: "Local",
            us: "United States",
            latam: "Latin America",
            global: "Global",
            tamu: "Texas A&M",
            games: "Aggie Games",
            advice: "Advice",
            fans: "Aggie Fans",
            greatThings: "Great Things",
            construction: "Construction",
            free: "Free Items",
            home: "Home",
            landscape: "Landscape",
            property: "Property Rental",
            vehicle: "Vehicles"
          },
          share: {
            create: "Howdy! Create a new post...",
            createAd: "Create new ad...",
            sellItem: "Sell a new item...",
            select: "Select Category *",
            pleaseSelect: "Please select a category.",
            add: "Add image/video/audio",
            gif: "Add GIF",
            flag: "Add TAMU flag",
            post: "Post",
            uploading: "Uploading...",
            error: "Videos must be shorter than 60 seconds. Audio must be shorter than 60 seconds.",
            ten: "You can only select up to 10 files.",
            addMore: "Add more +"
          },
          sections: {
            topPosts: "Most Liked Posts",
            home: "Home",
            discover: "Discover",
            friends: "Friends",
            postAd: "Post an Ad",
            shorts : "Shorts",
          },
          post: {
            comment: " Comment",
            share: "Share",
            write: "Write a comment...",
            send: "Send",
            rate: "rate this comment"
          },
          shorts: {
            desc: "Share short videos to have a laugh and stay updated.",
            post: "Upload a video shorter than 30 seconds.",
            caption: "Add a caption...",
          },
          update: {
            welcome: "Welcome to Postsstation!",
            start: "To get started, let's fill out your profile a little more.",
            optional: "All fields are optional",
            cover: "Cover Picture",
            profilePic: "Profile Picture",
            password: "Password",
            name: "Name",
            country: "Country/City",
            language: "Language",
            link: "Link",
            profile: "Business Profile?",
            business: "Business Type",
            msg: "A business account allows you to post ads and display information about your business on your profile.",
            update: "Update",
            updating: "Updating",
            start: "Get Started",
            submit: "Update Your Profile"
          },
          users: {
            build: "Build Your Community",
            following: "Following",
            follow: "Follow",
            followers: "Followers",
            all: "All Users",
            search: "Search"
          },
          tamu: {
            tamu: "Texas A&M University",
            desc: "Stay connected with your fellow Aggies.",
            filter: "Filter Posts by Category",
          },
          otherPages: {
            greatThings: "Share and discover fun content to connect with other users.",
            news: "Stay up-to-date with the latest news.",
            filterNews: "Filter News by Category",
            market: "Post advertisements, buy and sell goods, and find great deals near you!",
            postAd: "Post an ad for your business to appear in other users' social feed."
          },
          jobs: {
            desc: "Find a job or post a job opening for your business.",
            find: "Find a job",
            select: "Select",
            post: "Post a Job",
            filter: "Filter Jobs by Category",
            type: "Job type*",
            name: "Job name*",
            pay: "Pay*",
            schedule: "Schedule*",
            location: "Location",
            description: "Description",
            contact: "To apply, contact*: ",
            gardening: "Gardening",
            house: "Housekeeping",
            janitor: "Janitorial Service",
            restaurant: "Restaurant",
            students: "Students",
            professionals: "Professionals",
            temporary: "Temporary",
            office: "Office",
            sales: "Sales",
            delete: "delete job",
            error: "* indicates a required field"
          },
          notifs: {
            comment: "commented on your post.",
            follow: "followed you!",
            reaction: "reacted ",
            topost: " to your post.",
            notifs: "Notifications",
            today: "Today",
            week: "This week",
            earlier: "Earlier"
          },
          events: {
            desc: "Advertise your event or find plans for tonight!",
            submit: "Submit an Event",
            name: "Event name*",
            date: "Date*",
            time: "Time*",
            location: "Location*",
            description: "Description",
            url: "URL",
            upcoming: "Upcoming Events"
          },
          login: {
            login: "Login",
            desc: "We are a posts and content creation media that brings you the latest local news through our network. We invite users to share positive content, we encourage fans and the community to show support for the Texas A&M University Aggies!",
            dont: "Don't have an account?",
            register: "Register",
            username: "Username",
            invalid: "Invalid username or password",
            error: "Can't login!"
          },
          register: {
            desc: "We are a social media outlet, online marketplace, and news platform for Bryan/College Station!",
            do: "Do you have an account?",
            question: "Business or personal?",
            business: "Business",
            personalDesc: "Post photos, find jobs, buy new and used goods, and connect with your community.",
            businessDesc: "Everything a personal account can do, plus: post ads or job openings, sell goods, and advertise your business on your profile.",
            terms: "Note: By clicking `Register` below, you agree to the ",
            privacy: "Privacy Policy",
            use: "Terms of Use.",
            and: "and",
            back: "Go Back",
            businessName: "Business name",
            confirm: "Confirm password",
            error: "All fields are required.",
            password: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 24 characters long.",
            match: "Passwords don't match.",
            email: "Invalid email address."
          },
          adConfirmation: {
            thanks: "Thanks for your submission!",
            msg: "An admin will review your advertisement in 1-3 business days. If it is approved, your ad will appear in the social feed of other users.",
            postAnother: "Post Another Ad",
          },
          ad: {
            approveAds: "Approve Ads",
            approved: "Ad has been approved!",
            rejected: "Ad has been rejected.",
            delete: "You can delete the ad at anytime.",
            sureApprove: "Are you sure you want to approve this ad?",
            sureReject: "Are you sure you want to reject this ad?",
            back: "Go Back",
            approve: "Approve",
            reject: "Reject"
          },
          resetPassword: {
            forgot: "Forgot Password?",
            enterEmail: "Enter your email and we will send you a secure password reset token.",
            sendReset: "Send Token",
            emailVerification: "Email Verification",
            enterCode: "Enter the code we sent to your email",
            verify: "Verify",
            didntReceive: "Didn't receive code?",
            resendCodeIn: "Resend code in ",
            resendCode: "Resend code",
            resetPassword: "Reset Your Password",
            enterPassword: "Enter your new password below to securely reset your password.",
            change: "Change Password"
          }
        }
      },

      es: {
        translation: {
          reactions: {
            reactions: "Reacciónes",
            like: "Me gusta",
            love: "Me encanta",
            applause: "Aplausos",
            laughing: "Jaja",
            wow: "Wow",
            highfive: "¡Chócala!"
          },
          story: {
            upload: "Subir Historia",
            desc: "Se puede ver las historias para 24 horas hasta que se desaparezcan.",
            choose: "Seleccionar una imagen",
            error: "Sólo están autorizados los ficheros con formato PNG/JPG/JPEG.",
            post: "Subir"
          },
          categories: {
            all: "Todos",
            category: "Categoría",
            general: "General",
            jobs: "Empleos",
            events: "Eventos",
            news: "Noticias",
            newsArticles: "Noticias y Articulos",
            articles: "Articulos",
            local: "Locales",
            us: "Estados Unidos",
            latam: "Latinoamérica",
            global: "Globales",
            tamu: "Universidad Texas A&M",
            games: "Partidos de los Aggies",
            advice: "Consejos",
            greatThings: "Cosas geniales",
            construction: "Construcción",
            free: "Artículos grátis",
            home: "Hogar",
            landscape: "Jardínes",
            property: "Alquiler de propiedad",
            vehicle: "Vehículos"
          },
          share: {
            create: "Howdy! Hacer nueva publicación...",
            createAd: "Hacer nuevo anuncio...",
            sellItem: "Vender nueva cosa...",
            select: "Elegir Categoría *",
            add: "Seleccionar imagen/video/audio",
            gif: "Agregar GIF",
            flag: "Agregar la bandera de TAMU",
            post: "Subir",
            uploading: "Subiendo...",
            pleaseSelect: "Hay que seleccionar la categoría",
            error: "Sólo están autorizados los videos menos que 60 segundos y los audios menos que 60 segundos.",
            ten: "Sólo se puede elegir 10 fotos, videos, o audios.",
            addMore: "Agregar más +"
          },
          sections: {
            topPosts: "Los Posts más Gustados",
            home: "Inicio",
            discover: "Descubre más",
            friends: "Amigos",
            postAd: "Subir un anuncio",
            shorts: "Videos Cortos",
          },
          post: {
            comment: " Comentario",
            share: "Compartir",
            write: "Escribir nuevo comentario...",
            send: "Subir",
            rate: "calificar este comentario"
          },
          update: {
            welcome: "¡Bienvendios a Postsstation!",
            start: "Para empezar, vamos a completar tu perfil.",
            optional: "Todos los campos son opcionales.",
            cover: "Foto de portada",
            profilePic: "Foto de perfil",
            password: "Contraseña",
            name: "Nombre",
            country: "País/Ciudad",
            language: "Idioma",
            link: "URL",
            profile: "¿Cuenta de negocios?",
            business: "Tipo de negocio",
            msg: "Una cuenta de negocios te permite subir anuncios y mostrar informacion de tu negócio en el perfil.",
            update: "Actualizar",
            updating: "Actualizando",
            start: "¡A empezar!",
            submit: "Cambiar Tu Perfil"
          },
          users: {
            build: "Conectar con la Comunidad",
            following: "Seguiendo",
            follow: "Seguir",
            followers: "Seguidores",
            all: "Todos los Usuarios",
            search: "Buscar"
          },
          tamu: {
            tamu: "Universidad Texas A&M",
            desc: "Conectar con otros Aggies.",
            filter: "Filtrar los Posts por Categoría",
          },
          otherPages: {
            greatThings: "Compartir contenido divertido y conectar con otros usuarios.",
            news: "Mantente al día de lo que pasa en tu comunidad.",
            filterNews: "Filtrar las Noticias por Categoría",
            market: "Subir anuncios, vender y comprar cosas, y encontrar gangas locales!",
            postAd: "Subir un anuncio que aparezca en el inicio de otros usuarios."
          },
          jobs: {
            desc: "Encontrar trabajo o subir trabajos disponibles en tu negocio.",
            find: "Encontrar trabajo",
            post: "Subir trabajo",
            select: "Elegir",
            filter: "Filtrar los Empleos por Categoría",
            type: "Tipo de trabajo*",
            name: "Nombre de compania*",
            pay: "Salario*",
            schedule: "Horario*",
            location: "Lugar*",
            description: "Descripción",
            contact: "Para solicitar, contáctale a*: ",
            gardening: "Jardinería",
            house: "Limpieza de casas",
            janitor: "Servicio de Limpieza",
            office: "Oficina",
            sales: "Vendedores",
            restaurant: "Restaurante",
            students: "Estudiantes",
            professionals: "Profesionales",
            temporary: "Temporales",
            delete: "Quitar trabajo",
            error: "El asterisco (*) significa que el campo es obligatorio."
          },
          notifs: {
            comment: "comentó en tu post.",
            follow: "te siguió!",
            reaction: "reaccionó ",
            topost: "a tu post.",
            notifs: "Notificaciones",
            today: "Hoy",
            week: "Esta semana",
            earlier: "Más temprano"
          },
          events: {
            desc: "¡Anuncia tu evento o encuentra planes para esta noche!",
            submit: "Subir Evento",
            name: "Nombre del evento*",
            date: "Fecha*",
            time: "Tiempo*",
            location: "Lugar*",
            description: "Descripción",
            url: "URL",
            upcoming: "Eventos que Viene"
          },
          login: {
            login: "Acceso",
            desc: "¡Somos una red social que ofrece las noticias locales. Te invito a compartir contenido positivo y muestra apoyo a los Aggies de la Universidad Texas A&M!",
            dont: "¿No tienes cuenta?",
            register: "Registrar",
            username: "Nombre de usuario",
            invalid: "El nombre de usuario o la contraseña está mal",
            error: "No se puede hacer el login!"
          },
          register: {
            desc: "¡Somos una red social, mercado virtual, y medio de noticias para Bryan/College Station!",
            do: "¿Ya tienes cuenta?",
            question: "¿Negocios o personal?",
            business: "Negocios",
            personalDesc: "Subir fotos, buscar trabajo, comprar articulos, y conectar con la comunidad.",
            businessDesc: "To lo que puede hacer una cuenta personal, y más: subir anuncios o empleos, vender articulos, y anunciar tu negocio en tu perfil.",
            terms: "Aviso: Cuando haces click a `Registrar`, aceptas ",
            privacy: "la Política de Privacidad ",
            use: "los Términos y Condiciones de Uso",
            and: "y",
            back: "Regresar",
            businessName: "Nombre de negocio",
            confirm: "Confirmar la contraseña",
            error: "Se requiere que llenes todos los campos.",
            password: "La contraseña necesita contener al menos 1 letra minúscula, 1 letra mayúscula, 1 dígito y tener entre 8 y 24 caracteres.",
            match: "Las contraseñas no coinciden.",
            email: "Dirección de correo electrónico esta mál."
          },
          adConfirmation: {
            thanks: "¡Gracias por tu anuncio!",
            msg: "Vamos a revisar tu anuncio en 1-3 días hábiles. Si lo aprobamos, tu anuncio se irá para el feed de otros usuarios.",
            postAnother: "Subir Más",
          },
          ad: {
            approveAds: "Aprobar los Anuncios",
            approved: "Has aprobado el anuncio!",
            rejected: "Has rechazado el anuncio.",
            delete: "Puedes borrar el anuncio en cada momento.",
            sureApprove: "¿Quieres aprobar este anuncio?",
            sureReject: "¿Quieres rechazar este anuncio?",
            back: "Volver atrás",
            approve: "Aprobar",
            reject: "Rechazar"
          },
          resetPassword: {
            forgot: "¿Olvidaste tu contraseña?",
            enterEmail: "Escribe tu correo electronico y te vamos a enviar un código seguro para cambiar tu contraseña ",
            sendReset: "Enviar Código",
            emailVerification: "Verificación de Email",
            enterCode: "Escribe el código que te enviamos a tu correo electrónico",
            verify: "Verificar",
            didntReceive: "¿No recibiste el código?",
            resendCodeIn: "Reenviar código en",
            resendCode: "Reenviar código",
            resetPassword: "Cambiar tu Contraseña",
            enterPassword: "Escribe tu nueva contraseña para cambiarlo.",
            change: "Cambiar Contraseña"
          }
          
        }
      }
    }
  });


export default i18n;