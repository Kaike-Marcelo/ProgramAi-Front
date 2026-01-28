import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Breadcrumb } from '../../interfaces/breadcrumb.interface';
import { filter } from 'rxjs';
import { SkeletonBreadcrumbComponent } from "./skeleton-breadcrumb/skeleton-breadcrumb.component";

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, SkeletonBreadcrumbComponent],
  templateUrl: './breadcrumb.html',
})
export class BreadcrumbComponent {
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  private navigationEnd = signal<NavigationEnd | null>(null);

  breadcrumbs = computed(() => {
    const event = this.navigationEnd();
    if (!event) return [];

    const breadcrumb = this.#buildBreadCrumb(this.#route.root);

    return breadcrumb.map((bc, index, arr) => ({
      ...bc,
      isActive: index === arr.length - 1,
    }));
  })

  constructor() {
    this.#router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event) => {
        this.navigationEnd.set(event);
      });
  }

  #buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') url += `/${routeURL}`;

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url, isActive: false });
      }

      return this.#buildBreadCrumb(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
