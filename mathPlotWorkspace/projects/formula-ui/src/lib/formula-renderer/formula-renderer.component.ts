import {
  Component,
  effect,
  input,
  OnInit,
} from '@angular/core';
import {
  mathTree,
  BinaryNode,
  NumberNode,
  UnaryNode,
  MathTreeNode,
  precedence,
} from '../util/math-tree';
import { LibFormulaRendererComponent } from '../lib-formula-renderer/lib-formula-renderer.component';

@Component({
  selector: 'formula-renderer',
  standalone: true,
  imports: [LibFormulaRendererComponent],
  templateUrl: './formula-renderer.component.html',
  styleUrl: './formula-renderer.component.css',
})
export class FormulaRendererComponent implements OnInit {
  formula = input.required<string>();
  tree: MathTreeNode = new NumberNode('0');
  treeThingy = effect(() => (this.tree = mathTree(this.formula())));
  readonly paranthesis = input<boolean>(false);

  ngOnInit(): void {
    this.tree = mathTree(this.formula());
  }

  isBinaryNode(node: any): node is BinaryNode {
    return node instanceof BinaryNode;
  }
  isNumberNode(node: any): node is NumberNode {
    return node instanceof NumberNode;
  }
  isUnaryNode(node: any): node is UnaryNode {
    return node instanceof UnaryNode;
  }

  isLessPrecedence(operator: string, other: MathTreeNode): boolean {
    if (this.isBinaryNode(other) || this.isUnaryNode(other)) {
      return precedence[other.operator] < precedence[operator];
    }
    return false;
  }

  paranthesisStyle(node: MathTreeNode): string {
    if (this.isBinaryNode(node) && node.operator === '/') {
      if (
        this.isBinaryNode(node.left) &&
        node.left.operator === '/' &&
        this.isBinaryNode(node.right) &&
        node.right.operator === '/'
      ) {
        return 'biggest';
      }
      if (this.isBinaryNode(node.left) && node.left.operator === '/') {
        return 'bigger';
      }
      if (this.isBinaryNode(node.right) && node.right.operator === '/') {
        return 'bigger-low';
      }
      return 'big';
    }
    return 'normal';
  }

  protected readonly Math = Math;
  protected readonly Number = Number;
}
