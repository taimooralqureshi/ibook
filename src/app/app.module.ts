import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/shared/angular-material.module';
import { GraphQLModule } from '../shared/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { IbookEditorViewComponent } from './ibook-editor-view/ibook-editor-view.component';
import { ShareFormViewComponent } from './share-form-view/share-form-view.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { ibookContentReducer } from './Store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: 'book-editor-view', component: IbookEditorViewComponent },
  { path: 'share-form-view', component: ShareFormViewComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: '/book-editor-view', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    IbookEditorViewComponent,
    ShareFormViewComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    AngularMaterialModule,
    GraphQLModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({state: ibookContentReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
