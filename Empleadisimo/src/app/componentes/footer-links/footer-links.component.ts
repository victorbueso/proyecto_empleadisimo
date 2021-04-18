import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.css']

})

export class FooterLinksComponent{
  
  public show: boolean = true;
  id: string = "";
  info: any;
  content: any[] =
  [
    {
      id: "politicas", 
      description: 
      `1. Titular del tratamiento y objeto de esta Política de Privacidad
      Esta nota informativa describe las modalidades y finalidades con las cuales empleadisimo, efectúa el tratamiento de los datos de carácter personal de los usuarios (“Usuarios”) del sitio web www.empleadisimo.com (“Sitio”).
      En especial, a través del Sitio, el Usuario, esté registrado o no en el Sitio (conjuntamente “Usuario”) accede a las ofertas de empleo que las empresas, clientes de empleadisimo publican en el Sitio. De esta manera, el Usuario tiene acceso, a través de una única plataforma, a la mayor parte de las ofertas de empleo presentes en la página. Asimismo, previa registración, el Usuario (“Usuario Registrado”), podrá gozar de una serie de servicios específicos, descritos en las notas informativas detalladas cuyos enlaces están indicados en la siguiente Política.
      La presente nota informativa es proporcionada a los Usuarios del Sitio con arreglo al Decreto Legislativo 196/03 (el “Código de la Privacidad”), al Reglamento UE 679/2016 (el “ Reglamento”), a la normativa europea aplicable y a las resoluciones y recomendaciones emanadas por la Autoridad de Garantía para la protección de los datos personales.
      La presente nota informativa podrá ser modificada por empleadisimo también para incorporar las novedades legislativas sobre la materia, las evoluciones tecnológicas, las modificaciones de su actividad o la introducción de nuevos servicios. En caso de modificaciones a la política de privacidad, empleadisimo lo comunicará en el Sitio. En el caso de que los cambios fueran particularmente importantes, empleadisimo también los podrá comunicar a los Usuarios con otra modalidad (por ejemplo, con el envío de un mail).
      La nota informativa es proporcionada solo para el Sitio y para el tratamiento efectuado por empleadisimo y no se extiende a los tratamientos efectuados por terceros eventualmente consultados por el Usuario por medio de enlaces o por sujetos con los cuales empleadisimo colabora para brindar al Usuario los servicios requeridos o por quien accede a las informaciones sobre el Usuario a través del Sitio o de las aplicaciones de empleadisimo. Con respecto a estos otros tratamientos empleadisimo no asume ninguna responsabilidad.
      2. Finalidad del tratamiento de los datos personales
      Los datos son recogidos y tratados por empleadisimo, principalmente con instrumentos electrónicos, telemáticos y automatizados, con las siguientes finalidades:
      (a) Activación de los servicios de empleadisimo
      Los datos del Usuario serán tratados para permitir al Usuario no registrado (“Usuario No Registrado”) la visualización y el acceso, mediante el portal de empleadisimo, a ofertas de empleo publicadas por las empresas clientes de empleadisimo. En el caso de que el Usuario No Registrado haga clic en una oferta, podrá ser dirigido a la página de inicio donde podrá crear un usuario y podrá contar con todos los beneficios, así podrá leer los detalles de la oferta publicada por cada uno de nuestros clientes.
       (b) Activación de los servicios de empleadisimo para el Usuario Registrado
      `
    },
    {
      id: "terminos",
      description: 
      `
      4. Base jurídica del tratamiento
      La base jurídica del tratamiento de los datos de carácter personal de los Usuarios para la activación de los servicios de empleadisimo es la ejecución del servicio requerido por los Usuarios. Por lo tanto, la recogida de los datos de carácter personal es necesaria y el eventual rechazo a proporcionar dichos datos conlleva que empleadisimo no pueda administrar y efectuar el servicio requerido.
      Por el contrario, en lo que hace a la realización de análisis agregados y protección de los intereses de empleadisimo, la base jurídica del tratamiento de los datos de carácter personal de los Usuarios es el “interés legítimo” de empleadisimo y de las empresas clientes de empleadisimo: en estos casos, si bien la recogida de los datos de carácter personal de los Usuarios no es obligatoria por ley o esencial para la suministración del servicio en favor de éstos, es de todas formas necesaria pues dichos datos se encuentran estrechamente relacionados y son funcionales para alcanzar dichos intereses legítimos, los cuales no prevalecen sobre los derechos y las libertades fundamentales de los Usuarios y el eventual rechazo a proporcionarlos podría conllevar la imposibilidad de suministrar los servicios solicitados.
      Por último, en lo que hace al cumplimiento de las obligaciones impuestas por ley, tratándose de obligaciones impuestas por ley, el consentimiento al tratamiento no es necesario; por lo tanto, si los Usuarios no brindan sus datos no podrán acceder el servicio solicitado.
      Conócenos (En vez de acerca de)
      Empleadisimo es una plataforma que ayuda a las personas a encontrar un trabajo estable o una oportunidad de ingresos extra, y nuestros clientes a encontrar al profesional que mejor encaje con sus necesidades. Con este objetivo ofrece también soluciones innovadoras para la gestión del talento y la digitalización del reclutamiento.
      `
    },
    {
      id: "mision",
      description: 
      `
      Misión
      “Construir y Desarrollar los medios necesarios para impulsar el talento humano y ayudar a las empresas con el proceso de contratación para el profesional que mejor le favorece.
      `
    },
    {
      id: "vision",
      description: 
      `Visión Constituirnos como la plataforma más utilizada en nuestra región, donde podamos ofrecer los mejores medios, para resolver cada una de las necesidades de nuestros clientes y usuarios.
      `
    }
  ]
  figures: any[] = [
    {
      shape: "circle",
      cy: "20%",
      cx: "0%",
      class: "orange-figure"
    },
    {
      shape: "circle",
      cy: "55%",
      cx: "50%",
      class: "orange-figure"
    },
    {
      shape: "circle",
      cy: "80%",
      cx: "90%",
      class: "blue-figure"
    },
    {
      shape: "circle",
      cy: "80%",
      cx: "20%",
      class: "blue-figure"
    },
    {
      shape: "circle",
      cy: "10%",
      cx: "100%",
      class: "blue-figure"
    }
  ] 
  
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params =>{
        this.getContent(params['id'])
      }
    )
  }
  
  getContent(id: string){
    for(var i of this.content){
      if(i['id'] == id){
        this.info = i
      }
    }
  }

}

export interface figure{
  shape: string;
  cx: string; 
  cy: string;
  class: string;
}

