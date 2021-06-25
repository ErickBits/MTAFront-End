import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
//import { FollowingComponent } from './components/following/following.component';
//import { FollowedComponent } from './components/followed/followed.component';

// Guard
import { UserGuard } from './services/user.guard';
import { AdminComponent } from './modulos/admin/admin.component';
import { HomeAdminComponent } from './modulos/admin/submodulos/home-admin/home-admin.component';
import { PerfilAdminComponent } from './modulos/admin/submodulos/perfil-admin/perfil-admin.component';
import { LoginAdminComponent } from './modulos/admin/submodulos/login-admin/login-admin.component';
import { EditarPerfilAdminComponent } from './modulos/admin/submodulos/editar-perfil-admin/editar-perfil-admin.component';
import { PerfilesAdminComponent } from './modulos/admin/submodulos/perfiles-admin/perfiles-admin.component';
import { TuristaComponent } from './modulos/turista/turista.component';
import { HomeTuristaComponent } from './modulos/turista/submodulos/home-turista/home-turista.component';
import { PerfilTuristaComponent } from './modulos/turista/submodulos/perfil-turista/perfil-turista.component';
import { EditarPerfilTuristaComponent } from './modulos/turista/submodulos/editar-perfil-turista/editar-perfil-turista.component';
import { PerfilesTuristaComponent } from './modulos/turista/submodulos/perfiles-turista/perfiles-turista.component';
import { GuiaComponent } from './modulos/guia/guia.component';
import { HomeGuiaComponent } from './modulos/guia/submodulos/home-guia/home-guia.component';
import { PerfilGuiaComponent } from './modulos/guia/submodulos/perfil-guia/perfil-guia.component';
import { EditarPerfilGuiaComponent } from './modulos/guia/submodulos/editar-perfil-guia/editar-perfil-guia.component';
import { PerfilesGuiaComponent } from './modulos/guia/submodulos/perfiles-guia/perfiles-guia.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { InicioAdminComponent } from './modulos/admin/submodulos/inicio-admin/inicio-admin.component';
import { InicioGuiaComponent } from './modulos/guia/submodulos/inicio-guia/inicio-guia.component';
import { InicioTuristaComponent } from './modulos/turista/submodulos/inicio-turista/inicio-turista.component';
import { MensajesRecibidosAdminComponent } from './modulos/admin/submodulos/mensajes-recibidos-admin/mensajes-recibidos-admin.component';
import { MensajesRecibidosGuiaComponent } from './modulos/guia/submodulos/mensajes-recibidos-guia/mensajes-recibidos-guia.component';
import { MensajesRecibidosTuristaComponent } from './modulos/turista/submodulos/mensajes-recibidos-turista/mensajes-recibidos-turista.component';
import { MensajesEnviadosTuristaComponent } from './modulos/turista/submodulos/mensajes-enviados-turista/mensajes-enviados-turista.component';
import { MensajesEnviadosGuiaComponent } from './modulos/guia/submodulos/mensajes-enviados-guia/mensajes-enviados-guia.component';
import { MensajesEnviadosAdminComponent } from './modulos/admin/submodulos/mensajes-enviados-admin/mensajes-enviados-admin.component';
import { AdminGuard } from './services/admin.guard';
import { GuiaGuard } from './services/guia.guard';
import { TuristaGuard } from './services/turista.guard';
import { PaquetesTuristaComponent } from './modulos/turista/submodulos/paquetes-turista/paquetes-turista.component';


const routes: Routes = [
	{path:'inicioAdmin', component: InicioAdminComponent},
	{path:'inicioGuia', component: InicioGuiaComponent},
	{path:'inicioTurista', component: InicioTuristaComponent},
	{path:'mta', component: LandingPageComponent},
	{path: 'admin', component: AdminComponent,
		children:[
			{path:'home', component: HomeAdminComponent, canActivate:[AdminGuard]},
			{path:'perfil/:id', component: PerfilAdminComponent, canActivate:[AdminGuard]},
			{path:'perfil/:id/:section', component: PerfilAdminComponent, canActivate:[AdminGuard]},
			{path:'editarPerfil', component: EditarPerfilAdminComponent, canActivate:[AdminGuard]},
			{path:'mensajesRecibidos/:page', component: MensajesRecibidosAdminComponent, canActivate:[AdminGuard]},
			{path:'mensajesEnviados/:page', component: MensajesEnviadosAdminComponent, canActivate:[AdminGuard]},
			{path:'perfiles', component: PerfilesAdminComponent, canActivate:[AdminGuard]},
			{path:'perfiles/:page', component: PerfilesAdminComponent, canActivate:[AdminGuard]},
			{path: '**', redirectTo:'/home', pathMatch:"full"}
		]
	},
	{path: 'guia', component: GuiaComponent,
		children:[
			{path:'home', component: HomeGuiaComponent, canActivate:[GuiaGuard]},
			{path:'perfil/:id', component: PerfilGuiaComponent, canActivate:[GuiaGuard]},
			{path:'perfil/:id/:section', component: PerfilGuiaComponent, canActivate:[GuiaGuard]},
			{path:'editarPerfil', component: EditarPerfilGuiaComponent, canActivate:[GuiaGuard]},
			{path:'mensajesRecibidos/:page', component: MensajesRecibidosGuiaComponent, canActivate:[GuiaGuard]},
			{path:'mensajesEnviados/:page', component: MensajesEnviadosGuiaComponent, canActivate:[GuiaGuard]}, 
			{path:'perfiles', component: PerfilesGuiaComponent, canActivate:[GuiaGuard]},
			{path:'perfiles/:page', component: PerfilesGuiaComponent, canActivate:[GuiaGuard]},
			{path: '**', redirectTo:'/home', pathMatch:"full"}
		]
	},
	{path: 'turista', component: TuristaComponent,
		children:[
			{path:'inicio', component: InicioTuristaComponent, canActivate:[TuristaGuard]},
			{path:'home', component: HomeTuristaComponent, canActivate:[TuristaGuard]},
			{path:'perfil/:id', component: PerfilTuristaComponent, canActivate:[TuristaGuard]},
			{path:'perfil/:id/:section', component: PerfilTuristaComponent, canActivate:[TuristaGuard]},
			{path:'editarPerfil', component: EditarPerfilTuristaComponent, canActivate:[TuristaGuard]},
			{path:'paquetes', component: PaquetesTuristaComponent, canActivate:[TuristaGuard]},
			{path:'mensajesRecibidos/:page', component: MensajesRecibidosTuristaComponent, canActivate:[TuristaGuard]}, 
			{path:'mensajesEnviados/:page', component: MensajesEnviadosTuristaComponent, canActivate:[TuristaGuard]},
			{path:'perfiles', component: PerfilesTuristaComponent, canActivate:[TuristaGuard]},
			{path:'perfiles/:page', component: PerfilesTuristaComponent, canActivate:[TuristaGuard]},
			{path: '**', redirectTo:'/home', pathMatch:"full"}
		]
	},
	//{path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
	//{path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
	{path: '', redirectTo:'/mta', pathMatch:"full"},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);	//--> así carga todo.