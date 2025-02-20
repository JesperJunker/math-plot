import { Component, computed, input } from '@angular/core';
import {
  mathTree,
  BinaryNode,
  NumberNode,
  UnaryNode,
  MathTreeNode,
  precedence,
} from '../../util/math-tree';

@Component({
  selector: 'lib-formula-renderer',
  standalone: true,
  imports: [],
  templateUrl: './formula-renderer.component.html',
  styleUrl: './formula-renderer.component.css',
})
export class FormulaRendererComponent {
  formula = input.required<string>();
  readonly paranthesis = input<boolean>(false);
  readonly tree = computed(() => mathTree(this.formula()));

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
}
