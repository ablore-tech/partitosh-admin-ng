import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      //add
 {path: 'lead', loadChildren: () => import('../modules/lead/lead.module').then(m => m.LeadModule) },


      {path: 'sample', loadChildren: () => import('../modules/sample/sample.module').then(m => m.SampleModule)},
      {path: 'client', loadChildren: () => import('../modules/client/client.module').then(m => m.ClientModule)},
      {path: 'award', loadChildren: () => import('../modules/award/award.module').then(m => m.AwardModule)},
      {path: 'trust-badge', loadChildren: () => import('../modules/trust-badge/trust-badge.module').then(m => m.TrustBadgeModule)},
      {path: 'why-choose', loadChildren: () => import('../modules/why-choose/why-choose.module').then(m => m.WhyChooseModule)},
      {path: 'solution', loadChildren: () => import('../modules/solution/solution.module').then(m => m.SolutionModule)},
      {path: 'slider', loadChildren: () => import('../modules/slider/slider.module').then(m => m.SliderModule)},
      {path: 'contact-form', loadChildren: () => import('../modules/contact-form/contact-form.module').then(m => m.ContactFormModule)},
      {path: 'work', loadChildren: () => import('../modules/work/work.module').then(m => m.WorkModule)},
      {path: 'testimonial', loadChildren: () => import('../modules/testimonial/testimonial.module').then(m => m.TestimonialModule)},
      {path: 'blog-categories', loadChildren: () => import('../modules/category/category.module').then(m => m.CategoryModule)},
      {path: 'page', loadChildren: () => import('../modules/page/page.module').then(m => m.PageModule)},
      {path: 'blog', loadChildren: () => import('../modules/blog/blog.module').then(m => m.BlogModule)},
      {path: 'user', loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)},
      {path: 'settings', loadChildren: () => import('../modules/settings/settings.module').then(m => m.SettingsModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
