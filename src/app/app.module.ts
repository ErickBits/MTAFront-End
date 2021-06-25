import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { FormsModule} from '@angular/forms';

// Servicios --> para poder usar el Guard en cualquier ruta
import { UserGuard } from './services/user.guard';

// Rutas
import { routing } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { AdminComponent } from './modulos/admin/admin.component';
import { GuiaComponent } from './modulos/guia/guia.component';
import { TuristaComponent } from './modulos/turista/turista.component';
import { PerfilGuiaComponent } from './modulos/guia/submodulos/perfil-guia/perfil-guia.component';
import { HomeGuiaComponent } from './modulos/guia/submodulos/home-guia/home-guia.component';
import { LoginGuiaComponent } from './modulos/guia/submodulos/login-guia/login-guia.component';
import { PerfilesGuiaComponent } from './modulos/guia/submodulos/perfiles-guia/perfiles-guia.component';
import { PublicacionesGuiaComponent } from './modulos/guia/submodulos/publicaciones-guia/publicaciones-guia.component';
import { EditarPerfilGuiaComponent } from './modulos/guia/submodulos/editar-perfil-guia/editar-perfil-guia.component';
import { EditarPerfilTuristaComponent } from './modulos/turista/submodulos/editar-perfil-turista/editar-perfil-turista.component';
import { PerfilTuristaComponent } from './modulos/turista/submodulos/perfil-turista/perfil-turista.component';
import { PerfilesTuristaComponent } from './modulos/turista/submodulos/perfiles-turista/perfiles-turista.component';
import { LoginTuristaComponent } from './modulos/turista/submodulos/login-turista/login-turista.component';
import { HomeTuristaComponent } from './modulos/turista/submodulos/home-turista/home-turista.component';
import { PublicacionesTuristaComponent } from './modulos/turista/submodulos/publicaciones-turista/publicaciones-turista.component';
import { PublicacionesAdminComponent } from './modulos/admin/submodulos/publicaciones-admin/publicaciones-admin.component';
import { HomeAdminComponent } from './modulos/admin/submodulos/home-admin/home-admin.component';
import { PerfilAdminComponent } from './modulos/admin/submodulos/perfil-admin/perfil-admin.component';
import { PerfilesAdminComponent } from './modulos/admin/submodulos/perfiles-admin/perfiles-admin.component';
import { EditarPerfilAdminComponent } from './modulos/admin/submodulos/editar-perfil-admin/editar-perfil-admin.component';
import { LoginAdminComponent } from './modulos/admin/submodulos/login-admin/login-admin.component';
import { TimelineAdminComponent } from './modulos/admin/submodulos/timeline-admin/timeline-admin.component';
import { TimelineGuiaComponent } from './modulos/guia/submodulos/timeline-guia/timeline-guia.component';
import { TimelineTuristaComponent } from './modulos/turista/submodulos/timeline-turista/timeline-turista.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MenuGuiaComponent } from './modulos/guia/submodulos/menu-guia/menu-guia.component';
import { MenuAdminComponent } from './modulos/admin/submodulos/menu-admin/menu-admin.component';
import { MenuTuristaComponent } from './modulos/turista/submodulos/menu-turista/menu-turista.component';
import { InicioAdminComponent } from './modulos/admin/submodulos/inicio-admin/inicio-admin.component';
import { InicioGuiaComponent } from './modulos/guia/submodulos/inicio-guia/inicio-guia.component';
import { InicioTuristaComponent } from './modulos/turista/submodulos/inicio-turista/inicio-turista.component';
import { MensajesEnviadosAdminComponent } from './modulos/admin/submodulos/mensajes-enviados-admin/mensajes-enviados-admin.component';
import { MensajesEnviadosGuiaComponent } from './modulos/guia/submodulos/mensajes-enviados-guia/mensajes-enviados-guia.component';
import { MensajesEnviadosTuristaComponent } from './modulos/turista/submodulos/mensajes-enviados-turista/mensajes-enviados-turista.component';
import { MensajesRecibidosAdminComponent } from './modulos/admin/submodulos/mensajes-recibidos-admin/mensajes-recibidos-admin.component';
import { MensajesRecibidosGuiaComponent } from './modulos/guia/submodulos/mensajes-recibidos-guia/mensajes-recibidos-guia.component';
import { MensajesRecibidosTuristaComponent } from './modulos/turista/submodulos/mensajes-recibidos-turista/mensajes-recibidos-turista.component';
import { SidebarAdminComponent } from './modulos/admin/submodulos/sidebar-admin/sidebar-admin.component';
import { SidebarGuiaComponent } from './modulos/guia/submodulos/sidebar-guia/sidebar-guia.component';
import { SidebarTuristaComponent } from './modulos/turista/submodulos/sidebar-turista/sidebar-turista.component';
import { BannerTuristaComponent } from './modulos/turista/submodulos/banner-turista/banner-turista.component';
import { BannerGuiaComponent } from './modulos/guia/submodulos/banner-guia/banner-guia.component';
import { BannerAdminComponent } from './modulos/admin/submodulos/banner-admin/banner-admin.component';
import { FichadosAdminComponent } from './modulos/admin/submodulos/fichados-admin/fichados-admin.component';
import { InteresadosGuiaComponent } from './modulos/guia/submodulos/interesados-guia/interesados-guia.component';
import { FichadosGuiaComponent } from './modulos/guia/submodulos/fichados-guia/fichados-guia.component';
import { FichadosTuristaComponent } from './modulos/turista/submodulos/fichados-turista/fichados-turista.component';
import { AdminGuard } from './services/admin.guard';
import { GuiaGuard } from './services/guia.guard';
import { TuristaGuard } from './services/turista.guard';
import { SidebarInformacionAdminComponent } from './modulos/admin/submodulos/sidebar-informacion-admin/sidebar-informacion-admin.component';
import { SidebarInformacionGuiaComponent } from './modulos/guia/submodulos/sidebar-informacion-guia/sidebar-informacion-guia.component';
import { SidebarInformacionTuristaComponent } from './modulos/turista/submodulos/sidebar-informacion-turista/sidebar-informacion-turista.component';
import { PaquetesTuristaComponent } from './modulos/turista/submodulos/paquetes-turista/paquetes-turista.component';
import { TestsComponent } from './components/tests/tests.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuiaComponent,
    TuristaComponent,
    PerfilGuiaComponent,
    HomeGuiaComponent,
    LoginGuiaComponent,
    PerfilesGuiaComponent,
    PublicacionesGuiaComponent,
    EditarPerfilGuiaComponent,
    EditarPerfilTuristaComponent,
    PerfilTuristaComponent,
    PerfilesTuristaComponent,
    LoginTuristaComponent,
    HomeTuristaComponent,
    PublicacionesTuristaComponent,
    PublicacionesAdminComponent,
    HomeAdminComponent,
    PerfilAdminComponent,
    PerfilesAdminComponent,
    EditarPerfilAdminComponent,
    LoginAdminComponent,
    TimelineAdminComponent,
    TimelineGuiaComponent,
    TimelineTuristaComponent,
    LandingPageComponent,
    MenuGuiaComponent,
    MenuAdminComponent,
    MenuTuristaComponent,
    InicioAdminComponent,
    InicioGuiaComponent,
    InicioTuristaComponent,
    MensajesEnviadosAdminComponent,
    MensajesEnviadosGuiaComponent,
    MensajesEnviadosTuristaComponent,
    MensajesRecibidosAdminComponent,
    MensajesRecibidosGuiaComponent,
    MensajesRecibidosTuristaComponent,
    SidebarAdminComponent,
    SidebarGuiaComponent,
    SidebarTuristaComponent,
    BannerTuristaComponent,
    BannerGuiaComponent,
    BannerAdminComponent,
    FichadosAdminComponent,
    InteresadosGuiaComponent,
    FichadosGuiaComponent,
    FichadosTuristaComponent,
    SidebarInformacionAdminComponent,
    SidebarInformacionGuiaComponent,
    SidebarInformacionTuristaComponent,
    PaquetesTuristaComponent,
    TestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
    routing,
  ],
  providers: [
    UserGuard,
    AdminGuard,
    GuiaGuard,
    TuristaGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
