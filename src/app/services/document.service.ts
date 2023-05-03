import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private urls: string[]; // Your array of URLs would go here
  constructor(private http: HttpClient) {
    this.urls = [
      'https://cdn.loveandlemons.com/wp-content/uploads/2019/09/dinner-ideas-2-500x375.jpg',
      'https://img.bestrecipes.com.au/nyWSV2h8/w643-h428-cfill-q90/br/2021/12/pull-apart-sliders-964744-2.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0OXmwh38w8qgVL7n9jFQrQ1Qdttm-LyARMg&usqp=CAU',
      'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200',
      'https://hips.hearstapps.com/hmg-prod/images/new-ghost-white-fr-3-4-1-1598911711.jpg',
      'https://unsplash.com/photos/yC-Yzbqy7PY',
      'https://unsplash.com/photos/LNRyGwIJr5c',
      'https://unsplash.com/photos/N7XodRrbzS0',
      'https://unsplash.com/photos/Dl6jeyfihLk',
      'https://unsplash.com/photos/y83Je1OC6Wc',
      'https://unsplash.com/photos/LF8gK8-HGSg',
      'https://unsplash.com/photos/tAKXap853rY',
      'https://unsplash.com/photos/BbQLHCpVUqA',
      'https://unsplash.com/photos/xII7efH1G6o',
      'https://unsplash.com/photos/ABDTiLqDhJA',
      'https://unsplash.com/photos/6J--NXulQCs',
      'https://unsplash.com/photos/Cm7oKel-X2Q',
      'https://unsplash.com/photos/I_9ILwtsl_k',
      'https://unsplash.com/photos/3MtiSMdnoCo',
      'https://unsplash.com/photos/IQ1kOQTJrOQ',
      'https://unsplash.com/photos/NYDo21ssGao',
      'https://unsplash.com/photos/gkT4FfgHO5o',
      'https://unsplash.com/photos/Ven2CV8IJ5A',
      'https://unsplash.com/photos/Ps2n0rShqaM',
      'https://unsplash.com/photos/P7Lh0usGcuk',
      'https://unsplash.com/photos/nJdwUHmaY8A',
      'https://unsplash.com/photos/jVb0mSn0LbE',
      'https://unsplash.com/photos/du_OrQAA4r0',
      'https://unsplash.com/photos/8yqds_91OLw',
      'https://unsplash.com/photos/cZhUxIQjILg',
      'https://unsplash.com/photos/Iuq0EL4EINY',
      'https://unsplash.com/photos/tCICLJ5ktBE',
      'https://unsplash.com/photos/iJnZwLBOB1I',
      'https://unsplash.com/photos/_WiFMBRT7Aw',
      'https://unsplash.com/photos/V0yAek6BgGk',
    ];
  }

  // completion 1
  public async downloadDocuments(): Promise<any> {
    for (let i = 0; i < this.urls.length; i += 5) {
      const tasks = this.urls
        .slice(i, i + 5)
        .map((url) =>
          this.downloadDocument(url).pipe(
            catchError((err) => of({ failed: true, url, error: err }))
          )
        );
      const results = await forkJoin(tasks).toPromise();
      //Check results for errors.
      results?.forEach((result: any) => {
        if (result.failed) {
          console.error(
            `Error downloading document from ${result.url}: ${result.error}`
          );
        } else {
          // Document downloaded successfully, do something with it
        }
      });
    }
  }

  private downloadDocument(url: string) {
    return this.http.get(url, { responseType: 'blob' }) .subscribe((response) => {
      const reader = new FileReader();
      reader.onload = () => {
        url = reader.result as string;
      };
      reader.readAsDataURL(response);
    });
  }
}
