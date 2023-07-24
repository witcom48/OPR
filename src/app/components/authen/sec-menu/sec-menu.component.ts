import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-sec-menu',
  templateUrl: './sec-menu.component.html',
  styleUrls: ['./sec-menu.component.scss']
})
export class SecMenuComponent implements OnInit {
  attadding: string = "N";
  attedit: string = "N";
  attdelete: string = "N";
  attsalary: string = "N";
  empadding: string = "N";
  empedit: string = "N";
  empdelete: string = "N";
  empsalary: string = "N";
  filesatt: TreeNode[] = [
    {
      key: 'ATT',
      label: 'Attendance',
      // data: 'Attendance',
      // icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: 'ATT001',
          label: 'Policy',
          // data: 'Work Folder',
          children: [
            { key: 'ATT001-001', label: 'Plan Holiday' },
            { key: 'ATT001-002', label: 'Shift' },
          ]
        }
      ],
      expanded: true
    }
  ];
  filesemp: TreeNode[] = [
    {
      key: 'EMP',
      label: 'Employee',
      // data: 'Attendance',
      // icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: 'EMP001',
          label: 'Policy',
          // data: 'Work Folder',
          children: [
            { key: 'EMP001-001', label: 'Location' },
            { key: 'EMP001-002', label: 'Group Level' },
          ]
        }
      ],
      expanded: true
    }
  ];

  selectedFilesatt!: TreeNode[];
  selectedFilesemp!: TreeNode[];
  constructor() { }

  ngOnInit(): void {
  }
  sumit(): void {
    console.log(this.selectedFilesatt);
    console.log(this.selectedFilesemp);
  }
  tabChange(e: { index: any; }) {
    // console.log(e)
  }
}
